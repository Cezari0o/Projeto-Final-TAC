import SaudeAPI from "../Api/saudeAPI";
import { VacinaData } from "../../../types";
import formatBytes from "../../util/formatBytes";

export default class FetchWorker {
  private saudeAPIService;
  private startedFetch = false;

  private maxRetryCount;
  private maxRequestCount;
  private nextScrollID: string | null = null;
  private onFinishFetch;
  private servicesList;
  private initialFetchTime: Date | null = null;

  private netStatusData = {
    requestCount: 0,
    requestTotalSize: 0,
    totalItensCount: 0,
  };

  constructor(
    servicesList: ((data: VacinaData[]) => void)[],
    onFinishFetch: () => void
  ) {
    this.saudeAPIService = new SaudeAPI();
    this.maxRetryCount = process.env.MAX_RETRY_COUNT
      ? Number(process.env.MAX_RETRY_COUNT)
      : 3;
    this.maxRequestCount = process.env.MAX_REQUEST_COUNT
      ? Number(process.env.MAX_REQUEST_COUNT)
      : null;

    this.onFinishFetch = onFinishFetch;
    this.servicesList = servicesList;
  }

  private printStatus(final = false) {
    const formattedString = Object.entries(this.netStatusData)
      .map(([key, value]) => {
        if (key === "requestTotalSize") {
          return `${key}: ${formatBytes(value)}`;
        }
        return `${key}: ${value}`;
      })
      .join("\n");

    console.log(
      `\n--${
        final ? "-Final Status-" : " Fetch Status"
      } --\nTime: ${new Date().toISOString()}\n`,
      formattedString,
      (this.maxRequestCount &&
        `\nMax Request Count: ${this.maxRequestCount}`) ||
        "",
      (final &&
        `\nInitial time ${this.initialFetchTime?.toLocaleString()} / Final Fetch Time: ${new Date().toLocaleString()}`) ||
        ""
    );
  }

  async startAndGetStatus() {
    if (this.startedFetch) {
      return this.netStatusData;
    }

    this.initialFetchTime = new Date();
    this.fetchData();
    return this.netStatusData;
  }

  private finishedFetch() {
    if (this.maxRequestCount) {
      return this.netStatusData.requestCount >= this.maxRequestCount;
    }

    return false;
  }

  /**
   * TODO: Funcao de teste, remover mais tarde. Verifica a existencia de itens repetidos de `prev` em `atual`
   * @param prev
   * @param atual
   */
  private achei(prev: VacinaData[], atual: VacinaData[]) {
    prev.slice(0, 1000).forEach((vac) => {
      if (atual.find((atual_vac) => atual_vac._id === vac._id)) {
        console.log("achei tua vacina repetida");
      }
    });
  }

  async fetchData() {
    if (this.startedFetch) return;

    let retryCount = 0;

    this.startedFetch = true;

    console.log("Starting fetch");
    while (true) {
      try {
        let response: {
          data: VacinaData[];
          scrollID: string;
          empty: boolean;
          responseSize: number;
        };

        if (this.nextScrollID) {
          response = await this.saudeAPIService.nextFetch(this.nextScrollID);
        } else {
          response = await this.saudeAPIService.initialFetch();
        }

        if (response.empty) {
          console.log("Finishing data fetch");
          this.onFinishFetch();
          return;
        }

        this.netStatusData.requestCount++;
        this.netStatusData.requestTotalSize += response.responseSize;
        this.servicesList.forEach((service) => service(response.data));
        this.nextScrollID = response.scrollID;
        this.netStatusData.totalItensCount += response.data.length;

        this.printStatus();
        if (this.finishedFetch()) {
          this.printStatus(true);
          this.onFinishFetch();
          return;
        }
      } catch (err) {
        console.error("Error in fetching data!", err);
        retryCount++;
        if (retryCount >= this.maxRetryCount) {
          console.error("Maximum attempts reached! Finishing incompletely...");
          return;
        }
        console.error("Retrying...");
      }
    }
  }
}

import SaudeAPI from "../Api/saudeAPI";
import { VacinaData } from "../../../types";
import formatBytes from "../../util/formatBytes";
import axios from "axios";

export default class FetchWorker {
  private saudeAPIService;
  private startedFetch = false;

  private maxRetryCount;
  private maxRequestCount;
  private nextScrollID: string | null = null;
  private onFinishFetch;
  private servicesList;
  private initialFetchTime: Date | null = null;
  private pingTimeoutMinutes = Number(process.env.PING_TIMEOUT) || 25;
  private timeOutID: NodeJS.Timeout | undefined;
  private cancelPing = false;

  private finished = false;

  private netStatusData = {
    requestCount: 0,
    requestTotalSize: 0,
    totalItensCount: 0,
  };

  constructor(
    servicesList: ((data: VacinaData[]) => void)[],
    onFinishFetch: () => Promise<void>
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

  private async finishProcess() {
    this.cancelPing = true;
    this.finished = true;
    clearInterval(this.timeOutID);
    await this.onFinishFetch();
    return;
  }

  private keepAppAwake() {
    this.timeOutID = setInterval(async () => {
      if (this.cancelPing) {
        clearInterval(this.timeOutID);
        return;
      }
      console.log("\nAwaking app!");
      try {
        const res = await axios.get(process.env.APP_PROD_URL || "");
        console.log("Answer:", res.data);
      } catch (err) {
        console.log("Giving error:", err);
      }

      console.log("\n");
    }, this.pingTimeoutMinutes * 60 * 1000);
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
        final ? "- Final Status -" : " Fetch Status "
      }--\nTime: ${new Date().toISOString()}\n`,
      formattedString,
      (this.maxRequestCount &&
        `\nMax Request Count: ${this.maxRequestCount}`) ||
        "",
      (final &&
        `\nInitial time ${this.initialFetchTime?.toLocaleString()} / Final Fetch Time: ${new Date().toLocaleString()}`) ||
        "",
      "\n"
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
    this.keepAppAwake();

    const signalfn = async (sign: NodeJS.Signals) => {
      if (this.finished) {
        process.exit();
        return;
      }

      if (sign === "SIGINT") {
        console.log("User request to terminate...");
      } else {
        console.log(`Received ${sign}`);
      }
      console.log(`Shutting down, and saving everything...`);

      await this.finishProcess();
      process.exit();
    };

    const sigtermProcess = process.once("SIGTERM", signalfn);
    const sigintProcess = process.once("SIGINT", signalfn);

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
          await this.finishProcess();
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

          await this.finishProcess();
          return;
        }
      } catch (err) {
        console.error("Error in fetching data!", err);
        retryCount++;
        if (retryCount >= this.maxRetryCount) {
          await this.finishProcess();
          console.error("Maximum attempts reached! Saving...");
          return;
        }
        console.error("Retrying...");
      }
    }
  }
}

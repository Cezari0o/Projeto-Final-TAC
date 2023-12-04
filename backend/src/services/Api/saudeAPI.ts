import axios from "axios";
import { VacinaData } from "../../../types";

export default class SaudeAPI {
  private saudeAPI;

  constructor() {
    this.saudeAPI = axios.create({
      baseURL: process.env.SAUDE_API_URL,
      auth: {
        username: process.env.SAUDE_API_USER as string,
        password: process.env.SAUDE_API_PASSWORD as string,
      },
    });
  }

  async initialFetch() {
    const response = await this.saudeAPI.post(
      `/_search`,
      {
        size: 10000,
      },
      {
        params: {
          scroll: "1m",
        },
      }
    );

    const nextScrollID = response.data["_scroll_id"] as string;

    const vacinasList: VacinaData[] = response.data["hits"]["hits"];

    return {
      data: vacinasList,
      scrollID: nextScrollID,
      empty: vacinasList.length === 0,
      responseSize: response.headers["content-length"]
        ? Number(response.headers["content-length"])
        : 0,
    };
  }

  async nextFetch(scrollID: string) {
    const response = await this.saudeAPI.post("/_search/scroll", {
      scroll: "1m",
      scroll_id: scrollID,
    });
    const nextScrollID = response.data["_scroll_id"] as string;

    const vacinasList: VacinaData[] = response.data["hits"]["hits"];

    return {
      data: vacinasList,
      scrollID: nextScrollID,
      empty: vacinasList.length === 0,
      responseSize: response.headers["content-length"]
        ? Number(response.headers["content-length"])
        : 0,
    };
  }
}

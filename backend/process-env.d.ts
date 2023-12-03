declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT?: string;
      DATABASE_URL: string;
      SAUDE_API_URL: string;
      SAUDE_API_USER: string;
      SAUDE_API_PASSWORD: string;
      MAX_RETRY_COUNT: number;
      MAX_REQUEST_COUNT: number;
      REQUEST_SAVE_COUNT: number;
    }
  }
}

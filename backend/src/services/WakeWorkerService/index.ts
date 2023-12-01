import axios from "axios";
import WorkerScheduleRepo from "../../repos/workerScheduleRepo";
import Callback from "../../util/callbackType";
import { scheduleJob } from "node-schedule";

export class WakeWorkerService {
  private workerApi;
  constructor(private schedulerRepo: WorkerScheduleRepo) {
    this.workerApi = axios.create({
      baseURL: process.env.WORKER_URL,
    });
  }

  private async wakeUp() {
    // const response = this.workerApi.post<{}>("");

    return "Worker active";
  }

  private scheduleNextJob() {
    const newExecutionDate = new Date();
    newExecutionDate.setMonth(newExecutionDate.getMonth() + 1);
    console.log("Schedulling next worker job to", newExecutionDate);
    this.schedulerRepo.setWorkerNextExec(newExecutionDate);
  }

  /**
   * Funcao que acorda o worker. Deve ser chamada apenas uma vez ao iniciar a aplicacao.
   */
  async wakeUpWorker(done?: Callback<void>) {
    try {
      const nextExecution = await this.schedulerRepo.getWorkerNextExec();

      if (nextExecution < new Date()) {
        await this.wakeUp();

        done?.(null);

        this.scheduleNextJob();
        return;
      }

      const job = scheduleJob(nextExecution, this.wakeUp);
      job.on("success", () => this.scheduleNextJob());
      done?.(null);
    } catch (err) {
      done?.(err as any);
    }
  }
}

import axios from "axios";
import WorkerScheduleRepo from "../../repos/workerScheduleRepo";
import Callback from "../../util/callbackType";
import { scheduleJob } from "node-schedule";

export class WakeWorkerService {
  private wakeUpMethod;
  constructor(
    private schedulerRepo: WorkerScheduleRepo,
    wakeUpMethod: () => void
  ) {
    this.wakeUpMethod = wakeUpMethod;
  }

  private async wakeUp() {
    this.wakeUpMethod();
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

      nextExecution.setMinutes(nextExecution.getMinutes() + 10);
      if (nextExecution < new Date()) {
        await this.wakeUp();

        done?.(null);

        this.scheduleNextJob();
        return;
      }

      const job = scheduleJob(nextExecution, () => this.wakeUp());
      job.on("success", () => this.scheduleNextJob());
      done?.(null);
    } catch (err) {
      done?.(err as any);
    }
  }
}

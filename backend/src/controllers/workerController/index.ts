import WorkerSchedule from "../../repos/implementation/workerSchedule";
import { WakeWorkerService } from "../../services/WakeWorkerService";

export default function wakeWorker() {
  const scheduler = new WorkerSchedule();
  const workerService = new WakeWorkerService(scheduler);

  workerService.wakeUpWorker((err) => {
    if (err) {
      console.log(
        "Nao foi possivel agendar o worker:",
        err.message ? err.message : "Erro desconhecido!"
      );

      return;
    }

    scheduler.getWorkerNextExec().then((execution) => {
      console.log("Worker agendado! Proxima atualizacao:", execution);
    });
  });
}

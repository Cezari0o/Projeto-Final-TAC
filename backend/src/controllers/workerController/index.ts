import DataProcess from "../../repos/implementation/dataProcess";
import WorkerSchedule from "../../repos/implementation/workerSchedule";
import DataProcessService from "../../services/DataProcessService";
import FetchWorker from "../../services/FetchWorker";
import { WakeWorkerService } from "../../services/WakeWorkerService";

export default function wakeWorker() {
  const schedulerRepo = new WorkerSchedule();
  const dataProcessRepo = new DataProcess();
  const dataProcessService = new DataProcessService(dataProcessRepo);
  const worker = new FetchWorker(
    [(data) => dataProcessService.enderecoPacienteEstadoDataProcess(data)],
    () => dataProcessService.saveToDataBase()
  );

  const wakeUpWorkerService = new WakeWorkerService(schedulerRepo, () => {
    worker.startAndGetStatus();
  });

  wakeUpWorkerService.wakeUpWorker((err) => {
    if (err) {
      console.log(
        "Nao foi possivel agendar o worker:",
        err.message ? err.message : "Erro desconhecido!"
      );

      return;
    }

    schedulerRepo.getWorkerNextExec().then((execution) => {
      console.log("Worker agendado! Proxima atualizacao:", execution);
    });
  });
}

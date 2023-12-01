export default interface WorkerScheduleRepo {
  getWorkerNextExec: () => Promise<Date>;
  setWorkerNextExec: (when: Date) => Promise<void>;
}

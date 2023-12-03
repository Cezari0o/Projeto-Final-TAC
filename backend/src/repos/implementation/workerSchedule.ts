import prisma from "../prisma";
import WorkerScheduleRepo from "../workerScheduleRepo";

export default class WorkerSchedule implements WorkerScheduleRepo {
  getWorkerNextExec = async () => {
    try {
      const schedules = await prisma.workerScheduler.findMany();

      let nextExec: (typeof schedules)[0] | null = null;

      schedules.forEach((schedule) => {
        if (!nextExec) {
          nextExec = schedule;
          return;
        }

        nextExec = nextExec.id < schedule.id ? schedule : nextExec;
      });

      if (!nextExec) {
        throw new Error("No schedule found!");
      }

      return (nextExec as any).nextFetch as Date;
    } catch (err) {
      return new Date();
    }
  };

  setWorkerNextExec = async (when: Date) => {
    await prisma.workerScheduler.create({ data: { nextFetch: when } });
  };
}

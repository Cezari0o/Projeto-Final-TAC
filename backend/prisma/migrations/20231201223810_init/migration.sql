-- CreateTable
CREATE TABLE "WorkerScheduler" (
    "id" SERIAL NOT NULL,
    "nextFetch" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkerScheduler_pkey" PRIMARY KEY ("id")
);

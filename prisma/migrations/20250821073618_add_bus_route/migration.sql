-- AlterTable
ALTER TABLE "public"."Bus" ADD COLUMN     "routeId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Bus" ADD CONSTRAINT "Bus_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "public"."Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "seatNumber" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "BusRoute" ALTER COLUMN "seats" SET DEFAULT 70,
ALTER COLUMN "isAvalaible" SET DEFAULT true;

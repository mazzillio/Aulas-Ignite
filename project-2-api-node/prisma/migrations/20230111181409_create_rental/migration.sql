-- CreateTable
CREATE TABLE "Rentals" (
    "id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expected_return_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "total" DOUBLE PRECISION,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rentals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rentals" ADD CONSTRAINT "Rentals_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rentals" ADD CONSTRAINT "Rentals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

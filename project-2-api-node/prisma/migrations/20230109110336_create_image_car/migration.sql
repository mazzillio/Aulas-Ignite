-- CreateTable
CREATE TABLE "ImageCar" (
    "id" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImageCar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageCar" ADD CONSTRAINT "ImageCar_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "SpecificationsCars" (
    "car_id" TEXT NOT NULL,
    "specification_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpecificationsCars_pkey" PRIMARY KEY ("car_id","specification_id")
);

-- AddForeignKey
ALTER TABLE "SpecificationsCars" ADD CONSTRAINT "SpecificationsCars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificationsCars" ADD CONSTRAINT "SpecificationsCars_specification_id_fkey" FOREIGN KEY ("specification_id") REFERENCES "Specification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IUpdateCarDTO } from "../dtos/IUpdateCarDTO";
import { Car } from "../infra/model/Car";
import { Specification } from "../infra/model/Specification";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findById(id: string): Promise<Car>;
  findAvailables(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
  createSpecifications(
    car: Car,
    specifications: Specification[]
  ): Promise<void>;
  updateAvailable(data: IUpdateCarDTO): Promise<void>;
}

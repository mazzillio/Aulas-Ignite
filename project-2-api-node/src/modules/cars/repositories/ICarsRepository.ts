import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/model/Car";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}

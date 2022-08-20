import { container } from "tsyringe";

import { UsersRepositoryPostgres } from "../../modules/accounts/repositories/implementations/UsersRepositoryPostgres";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesReposiroty";
import { CategoriesRepositoryPostrges } from "../../modules/cars/repositories/implementations/CategoriesRepositoryPostgres";
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsReposiroty";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepositoryPostrges
);
container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepositoryPostgres
);

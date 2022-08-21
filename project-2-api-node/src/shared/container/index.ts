import { container } from "tsyringe";

import { UsersRepositoryPostgres } from "@modules/accounts/infra/typeorm/repositories/UsersRepositoryPostgres";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CategoriesRepositoryPostrges } from "@modules/cars/infra/typeorm/repositories/CategoriesRepositoryPostgres";
import { SpecificationsRepositoryPostgres } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepositoryPostgres";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesReposiroty";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsReposiroty";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepositoryPostrges
);
container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepositoryPostgres
);
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepositoryPostgres
);

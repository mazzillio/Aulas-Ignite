import { UsersPostgresRepository } from "src/modules/accounts/infra/prisma/UsersPostgresRepository";
import { CategoriesPostgresRepository } from "src/modules/cars/infra/prisma/CategoriesPostgresRepository";
import { SpecificationPostgresRepository } from "src/modules/cars/infra/prisma/SpecificationPostgresRepository";
import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesReposiroty";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsReposiroty";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesPostgresRepository
);
container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationPostgresRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersPostgresRepository
);

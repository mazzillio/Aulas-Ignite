import { UsersPostgresRepository } from "src/modules/accounts/infra/prisma/UsersPostgresRepository";
import { CarsImagesPostgresRepository } from "src/modules/cars/infra/prisma/CarsImagesPostgresRepository";
import { CarsPostgresRepository } from "src/modules/cars/infra/prisma/CarsPostgresRepository";
import { CategoriesPostgresRepository } from "src/modules/cars/infra/prisma/CategoriesPostgresRepository";
import { SpecificationPostgresRepository } from "src/modules/cars/infra/prisma/SpecificationPostgresRepository";
import { ICarsImagesRepository } from "src/modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "src/modules/cars/repositories/ICarsRepository";
import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";

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

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsPostgresRepository
);

container.registerSingleton<ICarsImagesRepository>(
  "CarsImageRepository",
  CarsImagesPostgresRepository
);

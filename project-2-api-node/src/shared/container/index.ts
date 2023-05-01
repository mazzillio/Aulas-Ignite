import { container } from "tsyringe";

import { UsersPostgresRepository } from "../../modules/accounts/infra/prisma/UsersPostgresRepository";
import { UsersTokensPostgresRepository } from "../../modules/accounts/infra/prisma/UsersTokensPostgresRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../modules/accounts/repositories/IUsersTokensRepository";
import { CarsImagesPostgresRepository } from "../../modules/cars/infra/prisma/CarsImagesPostgresRepository";
import { CarsPostgresRepository } from "../../modules/cars/infra/prisma/CarsPostgresRepository";
import { CategoriesPostgresRepository } from "../../modules/cars/infra/prisma/CategoriesPostgresRepository";
import { SpecificationPostgresRepository } from "../../modules/cars/infra/prisma/SpecificationPostgresRepository";
import { ICarsImagesRepository } from "../../modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { RentalsPostgresRepository } from "../../modules/rentals/infra/prisma/RentalsPostgresRepository";
import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository";

import "./providers";

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

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsPostgresRepository
);
container.registerSingleton<IUsersTokensRepository>(
  "UsersTokenRepository",
  UsersTokensPostgresRepository
);

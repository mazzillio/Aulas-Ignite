import { prisma } from "src/shared/infra/prisma/prisma";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../repositories/ISpecificationsReposiroty";
import { Specification } from "../model/Specification";

export class SpecificationPostgresRepository implements ISpecificationsRepository {
    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = new Specification({name, description});
        await prisma.specification.create({
            data:{
                id: specification.id,
                name: specification.name,
                description: specification.description
            }
        })
    }
    async findByName(name: string): Promise<Specification> {
        return prisma.specification.findFirst({
            where:{
                name
            }
        })
    }

}
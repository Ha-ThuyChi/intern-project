import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { OrganizationController } from "./organization.controller";
import { OrganizationService } from "./organization.service";
import { OrganizationRepository } from "src/repository/organization.repository";

@Module({
    imports: [PrismaModule],
    providers: [OrganizationService, OrganizationRepository],
    controllers: [OrganizationController]
})
export class OrganizationModule {}
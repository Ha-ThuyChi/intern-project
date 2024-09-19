import { Module } from "@nestjs/common";
import { PrismaModule } from "src/server/prisma/prisma.module";
import { OrganizationController } from "./organization.controller";
import { OrganizationService } from "./organization.service";
import { OrganizationRepository } from "src/server/repository/organization.repository";

@Module({
    imports: [PrismaModule],
    providers: [OrganizationService, OrganizationRepository],
    controllers: [OrganizationController]
})
export class OrganizationModule {}
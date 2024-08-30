import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { PrismaService } from 'src/providers/prisma';
import { Neo4jService } from '@src/providers/neo4j/neo4j.service';

@Module({
  controllers: [OffersController],
  providers: [OffersService, PrismaService, Neo4jService],
})
export class OffersModule {}

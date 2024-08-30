import { Module } from '@nestjs/common';
import { ClustersService } from './clusters.service';
import { ClustersController } from './clusters.controller';
import { PrismaService } from '@src/providers/prisma';
import { Neo4jService } from '@src/providers/neo4j/neo4j.service';

@Module({
  controllers: [ClustersController],
  providers: [ClustersService, PrismaService, Neo4jService],
})
export class ClustersModule {}

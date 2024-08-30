import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '@src/providers/prisma';
import { Neo4jService } from '@src/providers/neo4j/neo4j.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, Neo4jService],
})
export class UsersModule {}

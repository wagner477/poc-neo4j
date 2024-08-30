import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from './providers/neo4j/neo4j.module';
import { ConfigModule } from '@nestjs/config';
import { OffersModule } from './offers/offers.module';
import { UsersModule } from './users/users.module';
import { ClustersModule } from './clusters/clusters.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    Neo4jModule,
    OffersModule,
    UsersModule,
    ClustersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

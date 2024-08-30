// neo4j.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import neo4j from 'neo4j-driver';
import { Neo4jService } from './neo4j.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'NEO4J_DRIVER',
      useFactory: async (configService: ConfigService) => {
        const driver = neo4j.driver(
          configService.get<string>('NEO4J_URI'),
          neo4j.auth.basic(
            configService.get<string>('NEO4J_USER'),
            configService.get<string>('NEO4J_PASSWORD'),
          ),
        );

        await driver.getServerInfo();

        return driver;
      },
      inject: [ConfigService],
    },
    Neo4jService,
  ],
  exports: ['NEO4J_DRIVER', Neo4jService],
})
export class Neo4jModule {
  constructor(private readonly configService: ConfigService) {}
}

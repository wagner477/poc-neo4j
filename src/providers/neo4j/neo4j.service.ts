// neo4j.service.ts
import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import { Driver, Session } from 'neo4j-driver';

@Injectable()
export class Neo4jService implements OnModuleDestroy {
  constructor(@Inject('NEO4J_DRIVER') private readonly driver: Driver) {}

  getSession(): Session {
    return this.driver.session();
  }

  async runQuery(query: string, params: any = {}): Promise<any> {
    const session = this.getSession();
    try {
      const result = await session.run(query, params);
      return result.records;
    } finally {
      await session.close();
    }
  }

  async write(query: string, params: any = {}): Promise<any> {
    const session = this.getSession();
    try {
      const result = await session.writeTransaction((txc) =>
        txc.run(query, params),
      );
      return result.records;
    } finally {
      await session.close();
    }
  }

  async onModuleDestroy() {
    await this.driver.close();
  }
}

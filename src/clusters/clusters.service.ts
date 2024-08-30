import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from '@src/providers/neo4j/neo4j.service';
import { PrismaService } from '@src/providers/prisma';
import { randomUUID } from 'crypto';

@Injectable()
export class ClustersService {
  constructor(
    private readonly neo4j: Neo4jService,
    private readonly prisma: PrismaService,
  ) {}

  async createClusters() {
    await this.createCluster(randomUUID(), 'Maiores de 65');

    return { message: 'Clusters created' };
  }

  async getClusters() {
    const query = `
      MATCH (cluster:Cluster)
      RETURN cluster
    `;

    const results = await this.neo4j.runQuery(query);

    return results.map((result) => result.get('cluster').properties);
  }

  async deleteClusters() {
    const query = `
      MATCH (cluster:Cluster)
      DETACH DELETE cluster
    `;

    return this.neo4j.runQuery(query);
  }

  async getClusterById(id: string) {
    const query = `
      MATCH (cluster:Cluster {id: $id})
      RETURN cluster
    `;

    const results = await this.neo4j.runQuery(query, { id });

    return results.map((result) => result.get('cluster').properties);
  }

  async addOfferToCluster(offerId: string, clusterId: string) {
    return this.neo4j.runQuery(
      `
      MATCH (o:Offer {id: $offerId}), (c:Cluster {id: $clusterId})
      CREATE (c)-[:HAS_OFFER]->(o)
      RETURN c, o
    `,
      { offerId, clusterId },
    );
  }

  async addUserToCluster(userId: string, clusterId: string) {
    return this.neo4j.runQuery(
      `
      MATCH (u:User {id: $userId}), (c:Cluster {id: $clusterId})
      CREATE (u)-[:BELONGS_TO]->(c)
      RETURN u, c
    `,
      { userId, clusterId },
    );
  }

  async makeOfferVisibleToCluster(offerId: string, clusterId: string) {
    return this.neo4j.runQuery(
      `
      MATCH (o:Offer {id: $offerId}), (c:Cluster {id: $clusterId})
      CREATE (o)-[:VISIBLE_IN]->(c)
      RETURN o, c
    `,
      { offerId, clusterId },
    );
  }

  async makeOfferInvisibleToCluster(offerId: string, clusterId: string) {
    return this.neo4j.runQuery(
      `
      MATCH (o:Offer {id: $offerId}), (c:Cluster {id: $clusterId})
      CREATE (o)-[:INVISIBLE_IN]->(c)
      RETURN o, c
    `,
      { offerId, clusterId },
    );
  }

  async removeOfferFromCluster(offerId: string, clusterId: string) {
    return this.neo4j.runQuery(
      `
      MATCH (o:Offer {id: $offerId})-[r:VISIBLE_IN]->(c:Cluster {id: $clusterId})
      DELETE r
    `,
      { offerId, clusterId },
    );
  }

  async getAllUsersInCluster(clusterId: string) {
    const results = await this.neo4j.runQuery(
      `
      MATCH (u:User)-[:BELONGS_TO]->(c:Cluster {id: $clusterId})
      RETURN u
    `,
      { clusterId },
    );

    return results.map((record) => record.get('u').properties);
  }

  async addUserToClusterBulk(clusterId: string) {
    const batch = 1000;

    // const maleUserIds = await this.neo4j
    //   .runQuery(
    //     `
    //     MATCH (u:User)
    //     WHERE u.gender = 'male'
    //     RETURN u.id as id
    //     `,
    //   )
    //   .then((result) => result.map((record) => record.get('id')));

    // const female = await this.neo4j
    //   .runQuery(
    //     `
    //     MATCH (u:User)
    //     WHERE u.gender = 'female'
    //     RETURN u.id as id
    //     `,
    //   )
    //   .then((result) => result.map((record) => record.get('id')));

    // const maioresDe18 = await this.neo4j
    //   .runQuery(
    //     `
    //     MATCH (u:User)
    //     WHERE u.age >= 18
    //     RETURN u.id as id
    //     `,
    //   )
    //   .then((result) => result.map((record) => record.get('id')));

    // const maioresDe25 = await this.neo4j
    //   .runQuery(
    //     `
    //   MATCH (u:User)
    //   WHERE u.age >= 25
    //   RETURN u.id as id
    //   `,
    //   )
    //   .then((result) => result.map((record) => record.get('id')));

    const maioresDe65 = await this.neo4j
      .runQuery(
        `
      MATCH (u:User)
      WHERE u.age >= 65
      RETURN u.id as id
      `,
      )
      .then((result) => result.map((record) => record.get('id')));

    const total = maioresDe65.length;

    Logger.log(`Adding ${total} users to cluster`);

    for (let i = 0; i < total; i += batch) {
      const userBatch = maioresDe65.slice(i, i + batch);

      const query = `
        UNWIND $userIds as userId
        MATCH (u:User {id: userId}), (c:Cluster {id: $clusterId})
        CREATE (u)-[:BELONGS_TO]->(c)
        RETURN u, c
      `;

      await this.neo4j.runQuery(query, { userIds: userBatch, clusterId });

      Logger.log(`Processed ${Math.min(i + batch, total)} of ${total} users`);
    }

    return { message: 'Users added to cluster' };
  }

  private async createCluster(id: string, name: string) {
    return this.neo4j.runQuery(
      `
      CREATE (cluster:Cluster {id: $id, name: $name})
      RETURN cluster
    `,
      { id, name },
    );
  }
}

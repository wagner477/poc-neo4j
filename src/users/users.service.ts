import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { CityEnum, MaritalStatusEnum } from '@prisma/client';
import { Neo4jService } from '@src/providers/neo4j/neo4j.service';
import { PrismaService } from '@src/providers/prisma';
import { int } from 'neo4j-driver';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly neo4j: Neo4jService,
  ) {}

  async findAll() {
    return this.prisma.paginate('user', {
      select: {
        id: true,
        name: true,
      },
    });
  }

  async generateUsers() {
    const quantity = 3000000;
    const batch = 20000;

    const cities = Object.values(CityEnum);
    const maritalStatus = Object.values(MaritalStatusEnum);

    for (let i = 0; i < quantity; i += batch) {
      const users = Array.from({ length: batch }, () => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        gender: faker.person.sex(),
        age: Math.floor(Math.random() * 100),
        sign: faker.person.zodiacSign(),
        city: cities[Math.floor(Math.random() * cities.length)],
        maritalStatus:
          maritalStatus[Math.floor(Math.random() * maritalStatus.length)],
        birthDate: faker.date.past(),
        createdAt:
          Math.floor(Math.random() * 2) + 1 === 1
            ? new Date()
            : faker.date.past(),
      }));

      Logger.log(`Generated ${i + batch} users`);

      await this.prisma.user.createMany({
        data: users,
      });
    }

    return { message: `${quantity} offers generated` };
  }

  async createNodes() {
    const batch = 20000;

    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        sign: true,
        age: true,
        gender: true,
        email: true,
        createdAt: true,
        maritalStatus: true,
        birthDate: true,
        city: true,
      },
    });

    for (let i = 0; i < users.length; i += batch) {
      const userBatch = users.slice(i, i + batch);

      const query = `
        UNWIND $users as user
        CREATE (u:User)
        SET u = user
      `;
      await this.neo4j.runQuery(query, {
        users: userBatch,
      });

      Logger.log(`Created ${i + batch} nodes`);
    }
  }

  async getNodes() {
    const query = `
      MATCH (u:User)
      RETURN u
      LIMIT 100
    `;

    const total = await this.neo4j.runQuery(
      `MATCH (u:User) RETURN count(u) as total`,
    );

    console.log('Total nodes:', total[0].get('total').toNumber());

    const results = await this.neo4j
      .runQuery(query)
      .then((result) => result.map((record) => record.toObject()));

    return results.map((result: any) => result.u.properties);
  }

  async clearUsers() {
    const batch = 20000;

    // Clear Neo4j nodes in batches
    const total = await this.neo4j.runQuery(
      `MATCH (u:User) RETURN count(u) as total`,
    );

    for (let i = 0; i < total[0].get('total').toNumber(); i += batch) {
      const query = `
        MATCH (u:User)
        WITH u LIMIT $batch
        DETACH DELETE u
      `;

      await this.neo4j.runQuery(query, { batch: int(batch) });
    }

    return await this.prisma.user.deleteMany();
  }
}

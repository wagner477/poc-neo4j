import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma';
import { faker } from '@faker-js/faker';
import { PriceRatingEnum } from '@prisma/client';
import { Neo4jService } from '@src/providers/neo4j/neo4j.service';

@Injectable()
export class OffersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly neo4j: Neo4jService,
  ) {}

  async findAll() {
    return this.prisma.paginate('offer', {
      select: {
        id: true,
        title: true,
      },
    });
  }

  async generateOffers() {
    const quantity = 2;

    for (let i = 0; i < quantity; i++) {
      const offer = await this.prisma.offer.create({
        data: {
          title: faker.commerce.productName(),
          about: faker.commerce.productDescription(),
          website: faker.internet.url(),
          priceRating: PriceRatingEnum.CHEAP,
          giftbackCustomers: [123, 133],
          discountPercentage: faker.number.int({ min: 0, max: 100 }),
        },
      });

      await this.createOfferNode(offer.id, offer.title);
    }

    return { message: `${quantity} offers generated` };
  }

  async clearOffers() {
    await this.neo4j.runQuery(`
      MATCH (o:Offer)
      DETACH DELETE o
    `);

    return this.prisma.offer.deleteMany({});
  }

  async getNodes() {
    const query = `
      MATCH (o:Offer)
      RETURN o
    `;

    const results = await this.neo4j
      .runQuery(query)
      .then((result) => result.map((record) => record.toObject()));

    return results.map((result: any) => result.o.properties);
  }

  private async createOfferNode(offerId: string, title: string) {
    const query = `
      CREATE (o:Offer {id: $offerId, name: $title})
      RETURN o
    `;

    return this.neo4j.runQuery(query, { offerId, title });
  }
}

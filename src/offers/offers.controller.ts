import { Controller, Get } from '@nestjs/common';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get('/')
  async getAllOffers() {
    return this.offersService.findAll();
  }

  @Get('/generate')
  async generateOffers() {
    return this.offersService.generateOffers();
  }

  @Get('/clear')
  async clearOffers() {
    return this.offersService.clearOffers();
  }

  @Get('/get-nodes')
  async getNodes() {
    return this.offersService.getNodes();
  }
}

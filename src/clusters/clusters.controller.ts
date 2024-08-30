import { Controller, Get, Param } from '@nestjs/common';
import { ClustersService } from './clusters.service';

@Controller('clusters')
export class ClustersController {
  constructor(private readonly clustersService: ClustersService) {}
  @Get('/create')
  async createClusters() {
    return this.clustersService.createClusters();
  }

  @Get('/')
  async getClusters() {
    return this.clustersService.getClusters();
  }

  @Get('/:id')
  async getClusterById(@Param('id') id: string) {
    return this.clustersService.getClusterById(id);
  }

  @Get('/delete')
  async deleteClusters() {
    return this.clustersService.deleteClusters();
  }

  @Get('/get-users/:clusterId')
  async getUsersInCluster(@Param('clusterId') clusterId: string) {
    return this.clustersService.getAllUsersInCluster(clusterId);
  }

  @Get('/add-offer/:offerId/:clusterId')
  async addOfferToCluster(
    @Param('offerId') offerId: string,
    @Param('clusterId') clusterId: string,
  ) {
    return this.clustersService.addOfferToCluster(offerId, clusterId);
  }

  @Get('/add-user/:userId/:clusterId')
  async addUserToCluster(
    @Param('userId') userId: string,
    @Param('clusterId') clusterId: string,
  ) {
    return this.clustersService.addUserToCluster(userId, clusterId);
  }

  @Get('/add-user-bulk/:clusterId')
  async addUsersToCluster(@Param('clusterId') clusterId: string) {
    return await this.clustersService.addUserToClusterBulk(clusterId);
  }

  @Get('offer-visible/:offerId/cluster/:clusterId')
  async offerVisibleToUser(
    @Param('offerId') offerId: string,
    @Param('clusterId') clusterId: string,
  ) {
    return this.clustersService.makeOfferVisibleToCluster(offerId, clusterId);
  }

  @Get('remove-offer/:offerId/cluster/:clusterId')
  async removeOfferFromCluster(
    @Param('offerId') offerId: string,
    @Param('clusterId') clusterId: string,
  ) {
    return this.clustersService.removeOfferFromCluster(offerId, clusterId);
  }
}

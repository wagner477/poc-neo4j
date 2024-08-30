import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async getUsers() {
    return this.usersService.findAll();
  }

  @Get('/generate')
  async generateUsers() {
    return this.usersService.generateUsers();
  }

  @Get('/clear')
  async clearUsers() {
    return this.usersService.clearUsers();
  }

  @Get('/get-nodes')
  async getNodes() {
    return this.usersService.getNodes();
  }

  @Get('/create-nodes')
  async createNodes() {
    return this.usersService.createNodes();
  }
}

import { Controller, Get, Param, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('id')
  getUser(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body('favourites') favourites?: string[]
  ): Promise<UserDetails> {
    return this.userService.update(id, favourites);
  }
}

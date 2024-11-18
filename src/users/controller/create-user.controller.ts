import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from '../service/create-user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('auth')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.create(createUserDto);
  }
}

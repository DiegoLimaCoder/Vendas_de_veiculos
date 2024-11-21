import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateVehicleService } from '../service/create-vehicle.service';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { AdminGuard } from 'src/guard/admin.guard';
import { CurrentUser } from 'src/decorator/current-user-decorator';
import { PayloadDto } from 'src/users/dto/payload.dto';

@Controller('vehicles')
export class CreateVehicleController {
  constructor(private readonly createVehicleService: CreateVehicleService) {}

  @Post()
  @UseGuards(AdminGuard)
  async createVehicle(
    @Body() createVehicleDto: CreateVehicleDto,
    @CurrentUser() userId: PayloadDto,
  ) {
    return await this.createVehicleService.createVehicle(
      createVehicleDto,
      userId,
    );
  }
}

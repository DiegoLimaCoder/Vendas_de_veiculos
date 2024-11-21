import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadDto } from 'src/users/dto/payload.dto';

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as PayloadDto;
  },
);

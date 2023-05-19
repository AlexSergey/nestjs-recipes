import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';

@Controller('users')
export class UserController {
  @Post()
  async createUser(@Body() payload: UserDTO) {
    console.log(payload);

    return { message: 'User created successfully' };
  }
}

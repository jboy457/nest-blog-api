import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SuccessResponse } from 'src/interfaces/response.interface';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserCredentialsDto } from './dto/user-credentils.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body(ValidationPipe) userCredentialsDto: UserCredentialsDto,
  ): Promise<SuccessResponse> {
    return await this.authService.signUp(userCredentialsDto);
  }

  @Post('signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<SuccessResponse> {
    return await this.authService.signIn(authCredentialsDto);
  }
}

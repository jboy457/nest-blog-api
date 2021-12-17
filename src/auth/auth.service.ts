import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserCredentialsDto } from './dto/user-credentils.dto';
import { User } from './interfaces/user.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SuccessResponse } from 'src/interfaces/response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<SuccessResponse> {
    try {
      const user: User = await this.getUserByEmail(userCredentialsDto.email);
      if (user) throw new ConflictException('User Already Exist');
      userCredentialsDto.password = await bcrypt.hash(
        userCredentialsDto.password,
        10,
      );
      const newUser = await this.userModel.create(userCredentialsDto);
      return {
        status: true,
        message: 'Successfully signed up',
        data: newUser,
      };
    } catch (err) {
      throw err;
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<SuccessResponse> {
    try {
      const user: User = await this.getUserByEmail(authCredentialsDto.email);
      if (!user) throw new UnauthorizedException('Invalid email and password');
      const isPassCorrect: boolean = await bcrypt.compare(
        authCredentialsDto.password,
        user.password,
      );
      if (!isPassCorrect)
        throw new UnauthorizedException('Invalid email and password');
      const token = this.jwtService.sign({
        email: user.email,
        _id: user._id,
      });
      return {
        status: true,
        message: 'Successully Logged In',
        data: { token, user },
      };
    } catch (err) {
      throw err;
    }
  }

  private async getUserByEmail(email: string): Promise<User> {
    const user: User = await this.userModel.findOne({
      email,
    });
    return user;
  }
}

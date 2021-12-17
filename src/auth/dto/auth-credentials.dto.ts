import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @IsEmail({ message: 'Email is required' })
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password is too short(8 character min)' })
  password: string;
}

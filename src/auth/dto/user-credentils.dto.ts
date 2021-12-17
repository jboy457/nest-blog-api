import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserCredentialsDto {
  @IsString()
  @IsNotEmpty({ message: 'firstname is required' })
  firstname: string;

  @IsString()
  @IsNotEmpty({ message: 'lastname is required' })
  lastname: string;

  @IsString()
  @IsEmail({ message: 'Invalid email address' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password is too short(8 character min)' })
  password: string;
}

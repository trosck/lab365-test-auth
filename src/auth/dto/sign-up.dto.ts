import { IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  password: string;
}

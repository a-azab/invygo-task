import { ApiProperty, OmitType } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';

export class LoginDto extends OmitType(RegisterDto, ['name']) {}

import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../auth/roles/role.enum';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: Role;
}

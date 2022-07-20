import { ApiProperty } from '@nestjs/swagger';

export class FilterUserDto {
  @ApiProperty({ required: false })
  id?: number;
}

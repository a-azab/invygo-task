import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiProperty({ required: true })
  user_id: number;

  @ApiProperty({ required: true })
  date: Date;

  @ApiProperty({ required: true })
  hours: number;
}

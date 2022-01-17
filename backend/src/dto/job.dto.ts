import { IsNumber, IsString } from 'class-validator';

export class JobDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsNumber()
  hourlyPay: number;
}

/** This is used for getJobs endpoint */
export class JobDtoWithId extends JobDto {
  id: number;
}

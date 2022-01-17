import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { JobDto, JobDtoWithId } from './dto/job.dto';
import { Job } from './entities/Job';
import { JobService } from './service/job.service';

@Controller('')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('')
  async getJobs(): Promise<JobDto[]> {
    const jobs = await this.jobService.getJobs();
    return this.convertJobsToJobDtoWithIds(jobs);
  }

  @Get(':id')
  async getJobById(@Param('id') id: number): Promise<JobDto> {
    const job = await this.jobService.getJobById(id);
    if (!job) {
      throw new NotFoundException();
    }
    return this.convertJobToJobDto(job);
  }

  @Post('')
  async createJob(@Body() dto: JobDto): Promise<JobDtoWithId> {
    console.log(dto);
    const job = await this.jobService.createJob(dto);
    return this.convertJobToJobDtoWithId(job);
  }

  @Put(':id')
  async updateJobById(
    @Param('id') id: number,
    @Body() dto: JobDto,
  ): Promise<JobDto> {
    const job = await this.jobService.updateJob(id, dto);
    if (!job) {
      throw new NotFoundException();
    }
    return this.convertJobToJobDto(job);
  }

  @Delete(':id')
  async deleteJob(@Param('id') id: number): Promise<void> {
    await this.jobService.deleteJob(id);
    return;
  }

  private convertJobsToJobDtoWithIds(jobs: Job[]): JobDtoWithId[] {
    return jobs.map((job) => this.convertJobToJobDtoWithId(job));
  }

  private convertJobToJobDtoWithId(job: Job): JobDtoWithId {
    return { ...this.convertJobToJobDto(job), id: job.id };
  }

  private convertJobToJobDto(job: Job): JobDto {
    return {
      title: job.title,
      description: job.description,
      location: job.location,
      hourlyPay: job.hourlyPay,
    };
  }
}

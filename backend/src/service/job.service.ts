import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { JobDto } from '../dto/job.dto';
import { Job } from '../entities/Job';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: EntityRepository<Job>,
    private readonly em: EntityManager,
  ) {}

  getJobs() {
    return this.jobRepository.findAll();
  }

  getJobById(id: number) {
    return this.jobRepository.findOne(id);
  }

  /** Return undefined if job is not find */
  async createJob(newJob: JobDto): Promise<Job> {
    const job = this.jobRepository.create(newJob);
    await validate(job);
    await this.jobRepository.persistAndFlush(job);
    return job;
  }

  /** Return undefined if job is not find */
  async updateJob(id: number, updatedJob: JobDto) {
    const job = await this.jobRepository.findOne(id);
    if (!job) {
      return null;
    }
    wrap(job).assign(updatedJob);
    await this.jobRepository.flush();
    return job;
  }

  async deleteJob(id: number) {
    const job = await this.em.nativeDelete(Job, id);
    return;
  }
}

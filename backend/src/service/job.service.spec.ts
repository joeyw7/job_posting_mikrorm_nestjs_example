import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule, MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { JobDto } from 'src/dto/job.dto';
import { Job } from '../entities/Job';
import { JobService } from './job.service';

const fakeDbConfig: MikroOrmModuleSyncOptions = {
  entities: [Job],
  dbName: 'test-db',
  type: 'sqlite',
};

const jobDto: JobDto = {
  description: 'a',
  title: 'title',
  hourlyPay: 40,
  location: 'mock_location',
};

describe('JobService', () => {
  let jobService: JobService;
  let orm: MikroORM;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(fakeDbConfig),
        MikroOrmModule.forFeature([Job]),
      ],
      providers: [JobService],
    }).compile();

    jobService = app.get<JobService>(JobService);
    orm = app.get<MikroORM>(MikroORM);
    // init db schema
    const generator = orm.getSchemaGenerator();
    await generator.dropSchema();
    await generator.createSchema();
    await generator.updateSchema();
  });

  afterEach(async () => await orm.close(true));

  it('jobService is defined', () => {
    expect(jobService).toBeDefined();
  });

  describe('getJobs', () => {
    it('should return empty list of jobs is find', async () => {
      const jobs = await jobService.getJobs();
      expect(jobs).toEqual([]);
    });

    it('should returna list of jobs', async () => {
      const job = await createANewJob();
      const job2 = await createANewJob();
      const jobs = await jobService.getJobs();
      expect(jobs).toEqual([job, job2]);
    });
  });

  describe('getJobById', () => {
    it('should return null if not find', async () => {
      const jobId = 1000;
      let job = await jobService.getJobById(jobId);
      expect(job).toEqual(null);
      await createANewJob();
      job = await jobService.getJobById(jobId);
      expect(job).toEqual(null);
    });

    it('should return the correct job', async () => {
      const newJob = await createANewJob();
      const job = await jobService.getJobById(newJob.id);
      expect(job).toEqual(newJob);
    });
  });

  describe('createJob', () => {
    it('should create and return job', async () => {
      const newJob = await jobService.createJob(jobDto);
      expect(newJob.id).toEqual(1);
      expect(await orm.em.count(Job)).toEqual(1);
    });
  });

  describe('updateJob', () => {
    it('should return null if job not found', async () => {
      const newJob = await jobService.updateJob(1, jobDto);
      expect(newJob).toEqual(null);
    });

    it('should update the job accordingly', async () => {
      const newJob = await createANewJob();
      const updateDto = {
        description: 'updated_description',
        title: 'updated_title',
        hourlyPay: 100,
        location: 'updated_location',
      };
      const updatedJob = await jobService.updateJob(newJob.id, updateDto);
      expect(updatedJob.description).toEqual(updateDto.description);
      expect(updatedJob.title).toEqual(updateDto.title);
      expect(updatedJob.hourlyPay).toEqual(updateDto.hourlyPay);
      expect(updatedJob.location).toEqual(updateDto.location);
    });
  });

  describe('deleteJob', () => {
    it('should delete the job and return void', async () => {
      const newJob = await createANewJob();
      const updatedJob = await jobService.deleteJob(newJob.id);
      expect(updatedJob).toBeUndefined();
      expect(await orm.em.count(Job)).toEqual(0);
    });

    it('should return void evne if the job is not there', async () => {
      const updatedJob = await jobService.deleteJob(1);
      expect(updatedJob).toBeUndefined();
    });
  });

  const createANewJob = async () => {
    const newJob = new Job('mock_title', 'mock_desc', 'mock_location', 100);
    await orm.em.persistAndFlush([newJob]);
    return newJob;
  };
});

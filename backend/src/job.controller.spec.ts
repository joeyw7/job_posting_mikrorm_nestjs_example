import { HttpModule, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JobDtoWithId } from './dto/job.dto';
import { Job } from './entities/Job';
import { JobController } from './job.controller';
import { JobService } from './service/job.service';

describe('JobController', () => {
  let jobController: JobController;
  let jobService: JobService;

  const jobId = 1000;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [JobController],
      providers: [
        {
          provide: JobService,
          useValue: {
            getJobById: jest.fn(),
            getJobs: jest.fn(),
            createJob: jest.fn(),
            updateJob: jest.fn(),
            deleteJob: jest.fn(),
          },
        },
      ],
    }).compile();

    jobController = app.get<JobController>(JobController);
    jobService = app.get<JobService>(JobService);
  });

  describe('getJobById', () => {
    it('should throw 404 if not find', async () => {
      const jobId = 1000;
      jest.spyOn(jobService, 'getJobById').mockResolvedValue(undefined);
      await expect(jobController.getJobById(jobId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getJobs', () => {
    it('should return an empty list if no job is find', async () => {
      jest.spyOn(jobService, 'getJobs').mockResolvedValue([]);
      const result = await jobController.getJobs();
      expect(result).toEqual([]);
    });
  });

  describe('createJob', () => {
    it('should create a job', async () => {
      const newJob = new Job('mock_title', 'mock_desc', 'mock_location', 100);
      newJob.id = 4;
      jest.spyOn(jobService, 'createJob').mockResolvedValue(newJob);
      const result = await jobController.createJob(newJob);
      const expected: JobDtoWithId = {
        id: newJob.id,
        title: newJob.title,
        description: newJob.description,
        location: newJob.location,
        hourlyPay: newJob.hourlyPay,
      };
      expect(result).toEqual(expected);
    });
  });

  describe('updateJobById', () => {
    it('throw 404 if job not find', async () => {
      jest.spyOn(jobService, 'updateJob').mockResolvedValue(null);
      await expect(
        jobController.updateJobById(jobId, undefined),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteJob', () => {
    it('return empty response', async () => {
      jest.spyOn(jobService, 'deleteJob').mockResolvedValue(undefined);
      expect(await jobController.deleteJob(jobId)).toEqual(undefined);
    });
  });
});

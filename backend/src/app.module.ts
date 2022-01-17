import { HttpModule, Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JobService } from './service/job.service';
import { Job } from './entities/Job';
import config from './mikro-orm.config';

@Module({
  imports: [
    HttpModule,
    MikroOrmModule.forRoot(config),
    MikroOrmModule.forFeature([Job]),
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class AppModule {}

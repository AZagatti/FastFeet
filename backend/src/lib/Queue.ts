import Bee, { Job } from 'bee-queue';

import CancellationMail from 'app/jobs/CancellationMail';
import OrderMail from 'app/jobs/OrderMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail, OrderMail];

interface IQueues {
  [key: string]: {
    bee: Bee;
    handle(data: {} | undefined): void;
  };
}

interface IQueue {
  add(queue: string, job: {}): Promise<Job>;
  processQueue(): void;
}

class Queue implements IQueue {
  public queues: IQueues;

  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue: string, job: {}) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job: Job, err: any) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();

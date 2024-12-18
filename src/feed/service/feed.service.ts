import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedPostentity } from '../models/post.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Feedpost } from '../models/post.interface';
import { from, Observable } from 'rxjs';
@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostentity)
    private readonly feedpostRepository: Repository<FeedPostentity>,
  ) {}

  create(feedpost: Feedpost): Observable<Feedpost> {
    return from(this.feedpostRepository.save(feedpost));
  }

  findAll(): Observable<Feedpost[]> {
    return from(this.feedpostRepository.find());
  }

  update(id: number, feedpost: Feedpost): Observable<UpdateResult> {
    return from(this.feedpostRepository.update(id, feedpost));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.feedpostRepository.delete(id));
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FeedService } from '../service/feed.service';
import { Feedpost } from '../models/post.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post()
  create(@Body() feedpost: Feedpost): Observable<Feedpost> {
    return this.feedService.create(feedpost);
  }

  // @Get('get')
  // findAll(): Observable<Feedpost[]> {
  //   return this.feedService.findAll();
  // }

  @Get('get')
  findSelected(
    @Query('take') take: number = 1,
    @Query('skip') skip: number = 1,
  ): Observable<Feedpost[]> {
    take = take > 2 ? 2 : take;
    return this.feedService.findPosts(take, skip);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() feedpost: Feedpost,
  ): Observable<UpdateResult> {
    return this.feedService.update(id, feedpost);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<DeleteResult> {
    return this.feedService.delete(+id);
  }
}

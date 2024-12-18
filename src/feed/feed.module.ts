import { Module } from '@nestjs/common';
import { FeedService } from './service/feed.service';
import { FeedController } from './controller/feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedPostentity } from './models/post.entity';
@Module({
  imports: [TypeOrmModule.forFeature([FeedPostentity])],
  providers: [FeedService],
  controllers: [FeedController],
})
export class FeedModule {}

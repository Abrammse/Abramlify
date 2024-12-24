import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FeedService } from '../service/feed.service';
import { Feedpost } from '../models/post.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decortors/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  create(@Body() feedpost: Feedpost, @Request() req): Observable<Feedpost> {
    return this.feedService.create(req.user, feedpost);
  }

   @Get('ge')
  findAll(): Observable<Feedpost[]> {
     return this.feedService.findAll();
   }

  @Get('get')
  findSelected(
    @Query('take') take: number = 1,
    @Query('skip') skip: number = 1,
  ): Observable<Feedpost[]> {
    take = take > 20 ? 20 : take;
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

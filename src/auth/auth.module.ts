import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userentity } from './models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Userentity])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '../models/user.nterface';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() user: User): Observable<User> {
    return this.authService.registerAccount(user);
  }

  @Get('get')
  findAll(): Observable<User[]> {
    return this.authService.findAll();
  }

  @Post('login')
  login(@Body() user: User): Observable<{ token: string }> {
    return this.authService
      .login(user)
      .pipe(map((jwt: string) => ({ token: jwt })));
  }
}

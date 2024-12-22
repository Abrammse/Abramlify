import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { from, map, Observable } from 'rxjs';
import { switchMap } from 'rxjs';
import { User } from '../models/user.nterface';
import { InjectRepository } from '@nestjs/typeorm';
import { Userentity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Userentity)
    private readonly userentityRepository: Repository<Userentity>,
    private jwtService: JwtService,
  ) {}

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  registerAccount(user: User): Observable<User> {
    const { fristname, lastname, email, password } = user;

    return this.hashPassword(password).pipe(
      switchMap((hashedPassword: string) => {
        return from(
          this.userentityRepository.save({
            fristname,
            lastname,
            email,
            password: hashedPassword, // Save the hashed password
          }),
        ).pipe(
          map((user: User) => {
            delete user.password; // Remove the password field from the returned user
            return user;
          }),
        );
      }),
    );
  }

  findAll(): Observable<User[]> {
    return from(this.userentityRepository.find());
  }

  ValidateUser(email: string, password: string): Observable<User> {
    return from(
      this.userentityRepository.findOne({
        where: { email },
        select: ['id', 'fristname', 'lastname', 'email', 'password', 'role'],
      }),
    ).pipe(
      switchMap((user: User | null) => {
        if (!user) {
          throw new Error('User not found');
        }
        return from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (!isValidPassword) {
              throw new Error('Invalid credentials');
            }
            delete user.password; // Remove password before returning the user
            return user;
          }),
        );
      }),
    );
  }
  login(user: User): Observable<string> {
    const { email, password } = user;

    return this.ValidateUser(email, password).pipe(
      switchMap((user: User) => {
        if (user) {
          // Create JWT credentials
          return from(this.jwtService.signAsync({ user }));
        }
      }),
    );
  }
}

//   function switchMap(
//     arg0:(hashedPassword:string) =>void,):import('rxjs').OperatorFunction<string,User>{
//     throw new Error('function not implemented.');
//     }

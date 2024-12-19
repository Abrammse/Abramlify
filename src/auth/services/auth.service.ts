import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { from, Observable, switchMap } from 'rxjs';
import { User } from '../models/user.nterface';
import { InjectRepository } from '@nestjs/typeorm';
import { Userentity } from '../models/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {


       constructor(
         @InjectRepository(Userentity)
         private readonly userentityRepository: Repository<Userentity>,
       ) {}
     


  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  registerAccount(user:User) : Observable<User> {
    const {fristname,lastname,email,password} = user;



    return this.hashPassword(password).pipe(
        switchMap((this.hashPassword:string)=>{
            return from( this.userentityRepository.save({}))}),
   );
  }
}
  function switchMap(
    arg0:(hashedPassword:string) =>void,):import('rxjs').OperatorFunction<string,User>{
    throw new Error('function not implemented.');
    }
  




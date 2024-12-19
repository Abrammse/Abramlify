import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { from, Observable, switchMap } from 'rxjs';
import { User } from '../models/user.nterface';
@Injectable()
export class AuthService {
  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  registerAccount(user:User) : Observable<User> {
    const {fristname,lastname,email,password} = user;



    return this.hashPassword(password).pipe(
        switchMap((this.hashPassword:string)=>{
            return from(

        })
    )
  }
}

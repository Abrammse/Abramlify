import { Feedpost } from 'src/feed/models/post.interface';
import { Role } from './role.enum';

export interface User {
  id?: number;
  fristname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  role?: Role;
  createAt?: Date;
  posts?: Feedpost[];
}

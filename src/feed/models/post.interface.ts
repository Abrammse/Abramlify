import { User } from 'src/auth/models/user.nterface';

export interface Feedpost {
  id?: number;
  bady?: string;
  createAt?: Date;
  author?: User;
}

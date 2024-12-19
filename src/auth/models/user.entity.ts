import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.enum';
import { FeedPostentity } from 'src/feed/models/post.entity';

@Entity('user')
export class Userentity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fristname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => FeedPostentity, (feedPostentity) => feedPostentity.author)
  feedposts: FeedPostentity[];
}

import { Injectable } from '@nestjs/common';
import { User } from './users.entity.js';

@Injectable()
export class UsersRepository {
  private users: User[] = [
    { id: 1, username: 'usuario1' },
    { id: 2, username: 'usuario2' },
  ];

  findAll(): User[] {
    return this.users;
  }
}

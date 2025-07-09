import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll() {
    return this.usersRepository.findAll();
  }

  create(dto: CreateUserDto) {
    // Lógica de creación de usuario (ejemplo)
    return { id: Date.now(), ...dto };
  }
}

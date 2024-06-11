import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAllUsers(page: number, limit: number) {
    return this.usersRepository.getAllUsers(page, limit);
  }

  getUser(id: string) {
    return this.usersRepository.getUser(id);
  }

  createUser(newUser: any) {
    return this.usersRepository.createUser(newUser);
  }

  updateUser(id: string, newUser: any) {
    return this.usersRepository.updateUser(id, newUser);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}

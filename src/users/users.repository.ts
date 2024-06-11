import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getAllUsers(page: number, limit: number) {
    const start = (page - 1) * limit;

    const users = await this.usersRepository.find({
      take: limit,
      skip: start,
    });
    const usersDb = users.map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword,
    );
    return usersDb;
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user) return 'User not found';

    const { password, isAdmin, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async createUser(user: Partial<Users>): Promise<Partial<Users>> {
    await this.usersRepository.save(user);
    const newUser = await this.usersRepository.findOneBy({ id: user.id });
    const { password, isAdmin, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async updateUser(id: string, newUser: Users): Promise<Partial<Users>> {
    await this.usersRepository.update(id, newUser);
    const user = await this.usersRepository.findOneBy({ id });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async deleteUser(id): Promise<Partial<Users>> {
    const user = await this.usersRepository.findOneBy({ id });
    await this.usersRepository.delete(user);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

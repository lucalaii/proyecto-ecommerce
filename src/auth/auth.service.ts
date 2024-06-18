import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { Users } from 'src/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  getAuth(): string {
    return 'Obtener la autenticacion';
  }

  async signUp(user: Partial<Users>) {
    const foundedUser = await this.usersRepository.getUserByEmail(user.email);
    if (foundedUser) throw new BadRequestException('Registered email');

    const password = await bcrypt.hash(user.password, 10);

    return await this.usersRepository.createUser({ ...user, password });
  }

  async signIn(credentials: any) {
    const { email, password } = credentials;
    if (!email || !password) return 'Email and Password required';

    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) return 'Invalid credentials';

    const validate = await bcrypt.compare(password, user.password);

    if (!validate) throw new BadRequestException('Invalid credentials');

    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Logged',
      token,
    };
  }
}

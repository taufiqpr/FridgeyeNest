import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { USER_REPOSITORY } from '../repositories/user.repository';
import type { UserRepository } from '../repositories/user.repository';

export type LoginInput = { email: string; password: string };
export type LoginOutput = { id: number; email: string; username: string };

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepo.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }
    const match = await bcrypt.compare(input.password, user.password);
    if (!match) {
      throw new UnauthorizedException('Email atau password salah');
    }
    return { id: user.id, email: user.email, username: user.username };
  }
}



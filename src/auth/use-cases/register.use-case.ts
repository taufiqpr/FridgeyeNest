import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { USER_REPOSITORY } from '../repositories/user.repository';
import type { UserRepository } from '../repositories/user.repository';

export type RegisterInput = { email: string; username: string; password: string };
export type RegisterOutput = { id: number; email: string; username: string };

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(input: RegisterInput): Promise<RegisterOutput> {
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) {
      throw new ConflictException('Email sudah terdaftar');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await this.userRepo.create({
      email: input.email,
      username: input.username,
      password: hashedPassword,
    });

    return { id: user.id, email: user.email, username: user.username };
  }
}



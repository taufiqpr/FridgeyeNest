import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../repositories/user.repository';
import type { UserRepository } from '../repositories/user.repository';

export type GetProfileInput = { userId: number };
export type GetProfileOutput = { id: number; email: string; username: string; createdAt: Date };

@Injectable()
export class GetProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(input: GetProfileInput): Promise<GetProfileOutput> {
    const user = await this.userRepo.findById(input.userId);
    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return { id: user.id, email: user.email, username: user.username, createdAt: user.createdAt };
  }
}



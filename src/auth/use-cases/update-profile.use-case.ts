import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../repositories/user.repository';
import type { UserRepository } from '../repositories/user.repository';

export type UpdateProfileInput = { userId: number; email?: string; username?: string };
export type UpdateProfileOutput = { id: number; email: string; username: string };

@Injectable()
export class UpdateProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(input: UpdateProfileInput): Promise<UpdateProfileOutput> {
    const existing = await this.userRepo.findById(input.userId);
    if (!existing) {
      throw new NotFoundException('User tidak ditemukan');
    }
    const updated = await this.userRepo.updateById(input.userId, {
      email: input.email ?? existing.email,
      username: input.username ?? existing.username,
    });
    return { id: updated.id, email: updated.email, username: updated.username };
  }
}



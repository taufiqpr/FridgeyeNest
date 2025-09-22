import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../repositories/user.repository';
import type { UserRepository } from '../repositories/user.repository';

export type DeleteProfileInput = { userId: number };

@Injectable()
export class DeleteProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(input: DeleteProfileInput): Promise<void> {
    const existing = await this.userRepo.findById(input.userId);
    if (!existing) {
      throw new NotFoundException('User tidak ditemukan');
    }
    await this.userRepo.deleteById(input.userId);
  }
}



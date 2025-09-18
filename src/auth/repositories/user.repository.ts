import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { User } from '@prisma/client';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: { email: string; username: string; password: string }): Promise<User>;
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: { email: string; username: string; password: string }): Promise<User> {
    return this.prisma.user.create({ data });
  }
}

export const USER_REPOSITORY = 'USER_REPOSITORY';



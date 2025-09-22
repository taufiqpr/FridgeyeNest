import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { User } from '@prisma/client';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: { email: string; username: string; password: string }): Promise<User>;
  findById(id: number): Promise<User | null>;
  updateById(
    id: number,
    data: Partial<Pick<User, 'email' | 'username' | 'password'>>,
  ): Promise<User>;
  deleteById(id: number): Promise<void>;
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

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateById(
    id: number,
    data: Partial<Pick<User, 'email' | 'username' | 'password'>>,
  ): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteById(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}

export const USER_REPOSITORY = 'USER_REPOSITORY';



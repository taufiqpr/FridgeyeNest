import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type BookEntity = {
  id: number;
  title: string;
  author: string;
  description: string | null;
  year: number | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<BookEntity[]> {
    return this.prisma.book.findMany({ orderBy: { id: 'asc' } });
  }

  async getById(id: number): Promise<BookEntity> {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async create(
    input: Omit<BookEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<BookEntity> {
    return this.prisma.book.create({ data: input });
  }

  async update(
    id: number,
    input: Partial<Omit<BookEntity, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<BookEntity> {
    return this.prisma.book.update({ where: { id }, data: input });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.book.delete({ where: { id } });
  }
}



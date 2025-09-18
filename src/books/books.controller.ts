import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BooksService } from './books.service';
import type { BookEntity } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async list(): Promise<BookEntity[]> {
    return this.booksService.list();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<BookEntity> {
    return this.booksService.getById(id);
  }

  @Post()
  async create(@Body() body: CreateBookDto): Promise<BookEntity> {
    return this.booksService.create({
      title: body.title,
      author: body.author,
      description: body.description ?? null,
      year: body.year ?? null,
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBookDto,
  ): Promise<BookEntity> {
    return this.booksService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.booksService.remove(id);
  }
}



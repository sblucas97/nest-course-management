import { HttpCode, Patch } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get()
  findAll(@Res() response) {
    return response.status(200).send('Courses list.');
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `Course - ${id}`;
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() body) {
    console.log(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    console.log(body);
    return `Course update ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Course deleted ${id}`;
  }
}

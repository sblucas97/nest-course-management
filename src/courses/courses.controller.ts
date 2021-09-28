import {
  Patch,
  Delete,
  Controller,
  Get,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { Course } from './course.entity';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  private readonly coursesService: CoursesService;

  constructor(coursesService: CoursesService) {
    this.coursesService = coursesService;
  }

  @Get()
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Course> {
    return this.coursesService.findOne(id);
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(createCourseDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Course> {
    return this.coursesService.remove(id);
  }
}

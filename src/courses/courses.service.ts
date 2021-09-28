import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne(id);

    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }

    return course;
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);

    return await this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseRepository.preload({
      id,
      ...updateCourseDto,
    });

    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: string): Promise<Course> {
    const course = await this.findOne(id);

    return this.courseRepository.remove(course);
  }
}

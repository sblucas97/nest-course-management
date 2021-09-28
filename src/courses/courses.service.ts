import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: '1',
      name: 'Course 1 - Name',
      description: 'Course 1 - Description',
      tags: ['node.js', 'nestjs', 'javascript'],
    },
  ];

  findAll(): Course[] {
    return this.courses;
  }

  findOne(id: string): Course {
    const course = this.courses.find((item) => item.id === id);

    if (!course) {
      throw new HttpException(
        `Course ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return course;
  }

  create(createCourseDto: any): void {
    this.courses.push(createCourseDto);
  }

  update(id: string, updateCourseDto: any): void {
    const indexCourse = this.courses.findIndex((item) => item.id === id);

    if (indexCourse >= 0) {
      this.courses[indexCourse] = updateCourseDto;
    }
  }

  remove(id: string): void {
    this.courses = this.courses.filter((item) => item.id !== id);
  }
}

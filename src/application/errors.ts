import { HttpStatus } from '@nestjs/common';

export abstract class ApplicationError implements Error {
  name: string;

  protected constructor(public message: string, public status: HttpStatus) {
    this.name = typeof this;
  }
}

export class ValidationError extends ApplicationError {
  constructor(public message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

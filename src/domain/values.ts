import * as dayjs from 'dayjs';

export class DateTime {
  constructor(private readonly datetime: dayjs.Dayjs) {}

  toString() {
    return this.datetime.toString();
  }
}

export function parseDateTime(value: string | Date): DateTime {
  return new DateTime(dayjs(value));
}

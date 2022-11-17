import * as dayjs from 'dayjs';

export class DateTime {
  constructor(private readonly datetime: dayjs.Dayjs) {}
}

export function parseDateTime(value: string | Date): DateTime {
  return new DateTime(dayjs(value));
}

import * as dayjs from 'dayjs';

export class DateTime {
  constructor(private readonly datetime: dayjs.Dayjs) {}
}

export function parseDateTime(text: string): DateTime {
  return new DateTime(dayjs(text));
}

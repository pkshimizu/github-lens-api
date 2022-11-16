import {Dayjs} from "dayjs";
import dayjs from "../lib/dayjs";

export class DateTime {
  constructor(private readonly datetime: Dayjs) {
  }
  static parse(text: string): DateTime {
    return new DateTime(dayjs(text))
  }
}

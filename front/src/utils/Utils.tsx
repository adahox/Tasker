import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)


export const asTime = (value: string) => dayjs(value).format('HH:mm');

export const asDate = (value: string) => dayjs(value).format('DD/MM/YYYY');

export const getDiff = (startTime: string, endTime: string): string => {
  const time1 = dayjs(startTime);
  const time2 = dayjs(endTime);
  const diff = time2.diff(time1);
  const timeObject = new Date(diff).toString();

  return dayjs(timeObject).toISOString().slice(11,16);
}
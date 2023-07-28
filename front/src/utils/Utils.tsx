import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function converterHorasParaHorasEMinutos(valorHoras) {
  const horasInteiras = Math.floor(valorHoras);
  const minutos = Math.round((valorHoras - horasInteiras) * 60);
  return `${horasInteiras}:${minutos}`;
}

export const asTime = (value: string) => dayjs(value).format('HH:mm');

export const asDate = (value: string) => dayjs(value).format('DD/MM/YYYY');

export function allTimeWorked(startTime: string): number { //TODO: renomear e refatorar estas funções

  const time1: any = new Date(startTime);
  const time2: any  = new Date();
  const hours = Math.abs((time2 - time1)) / 36e5;

  return hours;
}

export const getDiff = (startTime: string, endTime: string): string => {

  const time1: any = new Date(startTime);
  const time2: any  = new Date(endTime);
  const hours = Math.abs((time2 - time1)) / 36e5;

  return converterHorasParaHorasEMinutos(hours);
}

export function formatTo(value: string, format: string): string {
  return dayjs(value).format(format);
}

import format from 'date-fns/format'


export const KelvinToDegree = (K: number) => {
  return Math.round(K - 273.15)
}

export const normalizeDate = (ts: number | string) => {
  return format(new Date(+ts * 1000), 'dd.MM.yyyy hh:mm:ss')
}

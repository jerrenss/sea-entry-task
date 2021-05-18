import moment from 'moment'

export const convertTimestamp = (timestamp) => {
  return moment(timestamp).format('YYYY/MM/DD')
}

export const convertTimestampExact = (timestamp) => {
  return moment(timestamp).format('YYYY/MM/DD HH:mm')
}

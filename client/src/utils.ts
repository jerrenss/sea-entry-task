import moment from 'moment'

export const convertTimestamp = (timestamp) => {
  return moment(timestamp).format('DD/MM/YYYY')
}

export const convertTimestampExact = (timestamp) => {
  return moment(timestamp).format('DD/MM/YYYY HH:mm')
}

import moment from 'moment';

export const formatTime = (time: string): string => {
  return moment(time, 'HH:mm').format('HH:mm');
};

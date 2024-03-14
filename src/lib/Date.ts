import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';

export const getTodayTime = () => {
  dayjs.extend(utc);
  dayjs.locale('ko');
  dayjs.extend(relativeTime);
  const now = dayjs();
  const hours = now.get('h') < 12 ? '오전' : '오후';
  const hoursAmPm = hours + (now.get('h') % 12);

  return dayjs().format(`YYYY-MM-DD dddd ${hoursAmPm}:mm:ss`);
};

import { formatDistance } from 'date-fns';
import { id } from 'date-fns/locale';

const formatDistanceDate = (date) => formatDistance(
  new Date(date),
  new Date(),
  { includeSeconds: true, locale: id },
);

export default formatDistanceDate;

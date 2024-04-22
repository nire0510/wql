import uniqWith from 'lodash.uniqwith';
import isEqual from 'lodash.isequal';

export default function distinct(data: KeyValue[], apply?: boolean): KeyValue[] {
  if (apply) {
    return uniqWith(data, isEqual);
  }

  return data;
}

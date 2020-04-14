import Test from '@/model';
import Test1 from '@/model/module1';
import _ from 'lodash';

function ss() {
  // eslint-disable-next-line no-console
  console.log(_.startCase('--ab-c--'));
  const ss1 = new Test1(5, 3);
  // eslint-disable-next-line no-console
  console.log(ss1);
  return new Test(2, 3);
}

export default ss;

import { sleep } from 'antd-mobile/es/utils/sleep';

export async function moreData(Data,flag) {
  if (Data.length <= flag + 1) {
    return [];
  }

  const moreData = Data.slice(flag, flag + 5);

  if (flag > 0) {
    await sleep(1000);
  }

  flag += 5;
  return moreData;
}

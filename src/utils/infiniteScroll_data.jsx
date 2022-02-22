import { sleep } from 'antd-mobile/es/utils/sleep';

let flag = 0;

export async function moreData(Data) {

  if (Data.length <= flag + 1) {
    return [];
  }

  const moreData = Data.slice(flag, flag + 5);
  
  await sleep(2000);
  flag += 5;
  
  return moreData;

}

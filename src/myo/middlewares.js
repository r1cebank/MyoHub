/**
 * middlewares
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */

import AppSingleton     from '../utils/appsingleton';

function myos(_, res) {
  const TAG = 'myos';
  //  Creating a new shared instance for winston logger
  const sharedInstance = AppSingleton.getInstance();
  res.send(sharedInstance.myos);
  sharedInstance.L.info(TAG, 'number of myos ' + sharedInstance.myos.length);
}

export default {myos};

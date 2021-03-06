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
  res.send(Object.keys(sharedInstance.myoData).length.toString());
  sharedInstance.L.info(TAG, 'number of myos ' + Object.keys(sharedInstance.myoData).length);
}

function pubkey(_, res) {
  const TAG = 'pubkey';
  //  Creating a new shared instance for winston logger
  const sharedInstance = AppSingleton.getInstance();
  res.send(sharedInstance.public);
  sharedInstance.L.info(TAG, 'requested public key');
}

export default {myos, pubkey};

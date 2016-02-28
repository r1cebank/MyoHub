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
  res.send(sharedInstance.myoData);
  sharedInstance.L.info(TAG, 'number of myos ' + sharedInstance.myos.length);
}

function pubkey(_, res) {
  const TAG = 'pubkey';
  //  Creating a new shared instance for winston logger
  const sharedInstance = AppSingleton.getInstance();
  res.send(sharedInstance.public);
  sharedInstance.L.info(TAG, 'requested public key');
}

export default {myos, pubkey};

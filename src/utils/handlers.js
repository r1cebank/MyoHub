/**
 * handlers
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */

import AppSingleton     from './appsingleton';

//  define a shared instance for global variables
const sharedInstance = AppSingleton.getInstance();

function onError(err) {
  const TAG = 'onError';
  sharedInstance.L.error(TAG, err);
}

function onExit(options, err) {
  const TAG = 'onExit';
  sharedInstance.L.info(TAG, 'process exited');
  if (err) sharedInstance.L.warn(TAG, err.stack);
  if (options.exit) process.exit();
}

export default {
  onError,
  onExit
};

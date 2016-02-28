/**
 * app.js
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */

import AppSingleton     from './appsingleton';

async function start() {
  const TAG = 'start';
  //  Creating a new shared instance for winston logger
  const sharedInstance = AppSingleton.getInstance();
  sharedInstance.server.listen(sharedInstance.port);
  const host = sharedInstance.server.address().address;
  sharedInstance.L.info(TAG, `HTTP Server running at: ${host}:${sharedInstance.port}`);
}

export default {start};

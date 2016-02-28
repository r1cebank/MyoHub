/**
 * startup
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */

import AppSingleton     from './appsingleton';
import Events           from '../myo/events';
import Middlewares      from '../myo/middlewares';

async function beforeStart() {
  const TAG = 'beforeStart';
  //  Creating a new shared instance for winston logger
  const sharedInstance = AppSingleton.getInstance();
  sharedInstance.myoClient.on('connection', Events.onConnect);
  sharedInstance.L.info(TAG, 'finished running.');
  sharedInstance.app.get('/myos', Middlewares.myos);
}

export default {beforeStart};

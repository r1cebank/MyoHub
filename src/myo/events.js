/**
 * events
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */

import AppSingleton     from '../utils/appsingleton';
import Events           from './connection/events';

function onConnect(socket) {
  const TAG = 'onConnect';
  //  Creating a new shared instance for winston logger
  const sharedInstance = AppSingleton.getInstance();
  //  Pushing the socket
  socket.myoDataId = sharedInstance.myoData.length;
  sharedInstance.myos.push(socket);
  //  Increase the myoData size
  sharedInstance.myoData.push({});
  //  Set the event handlers for this connection
  socket.on('frame', Events.onFrame);
  sharedInstance.L.info(TAG, 'Client connected');
}

export default {onConnect};

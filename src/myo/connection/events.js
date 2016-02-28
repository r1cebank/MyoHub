/**
 * events
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */

import AppSingleton     from '../../utils/appsingleton';
import JWT              from 'jsonwebtoken';


function onFrame(frame) {
  const TAG = 'onFrame';
  //  Creating a new shared instance for winston logger
  const sharedInstance = AppSingleton.getInstance();
  //  Setting the myodata in the array
  frame.color = this.color;
  frame.id = this.myoDataId;
  sharedInstance.myoData[this.myoDataId] = frame;
  sharedInstance.L.info(TAG, 'getting data from myo ' + this.myoDataId);
  //  Send the client the data back
  sharedInstance.myoConsumer.emit('frame', JWT.sign(sharedInstance.myoData, sharedInstance.cert, { algorithm: 'RS256'}));
}

function onDisconnect() {
  const TAG = 'onDisconnect';
  //  Creating a new shared instance for winston logger
  const sharedInstance = AppSingleton.getInstance();
  //  Remove the myodata from client
  delete sharedInstance.myoData[this.myoDataId];
  sharedInstance.L.info(TAG, 'Myo Client disconnected');
}


export default {onFrame, onDisconnect};

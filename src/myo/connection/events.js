/**
 * events
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */

import AppSingleton     from '../../utils/appsingleton';


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
  sharedInstance.myoConsumer.emit('frame', sharedInstance.myoData);
}

function onDisconnect() {
  const TAG = 'onDisconnect';
  //  Creating a new shared instance for winston logger
  const sharedInstance = AppSingleton.getInstance();
  //  Remove the myodata from client
  delete sharedInstance.myoData[this.myoDataId];
  if (Object.keys(sharedInstance.myoData).length === 0) {
    sharedInstance.L.info(TAG, 'No Myo Client connected');
    sharedInstance.myoConsumer.emit('clear');
  }
  sharedInstance.L.info(TAG, 'Myo Client disconnected');
}


export default {onFrame, onDisconnect};

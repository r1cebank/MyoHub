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
  sharedInstance.myoData[this.myoDataId] = frame;
  sharedInstance.L.info(TAG, 'getting data from myo ' + this.myoDataId);
}


export default {onFrame};

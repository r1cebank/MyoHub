/**
 * events
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */

import AppSingleton     from '../utils/appsingleton';
import Events           from './connection/events';
import Shortid          from 'shortid';
import RandomColor      from 'just.randomcolor';

function onConnect(socket) {
  const TAG = 'onConnect';
  //  Creating a new shared instance for winston logger
  const sharedInstance = AppSingleton.getInstance();
  //  Pushing the socket
  socket.color = new RandomColor().toHex().toCSS();
  socket.myoDataId = Shortid.generate();
  sharedInstance.myos.push(socket);
  //  Increase the myoData size
  sharedInstance.myoData[socket.myoDataId] = {};
  //  Set the event handlers for this connection
  socket.on('frame', Events.onFrame);
  socket.on('disconnect', Events.onDisconnect);
  sharedInstance.L.info(TAG, 'Myo Client connected');
}

function onConsumerConnect() {
  const TAG = 'onConsumerConnect';
  //  Creating a new shared instance for winston logger
  const sharedInstance = AppSingleton.getInstance();
  sharedInstance.L.info(TAG, 'Myo Consumer connected');
}

export default {onConnect, onConsumerConnect};

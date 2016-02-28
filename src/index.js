/**
 * index.js
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */

//  Custom Library
import AppSingleton     from './utils/appsingleton';

//  Application lifecycle
import Setup            from './utils/setup';
import Startup          from './utils/startup';
import Application      from './utils/app';
import Handlers         from './utils/handlers';

(async function () {

  //  AppSingleton Instance
  const sharedInstance = AppSingleton.getInstance();
  sharedInstance.startTime = new Date();


  /*!
  *  Ran configuration to setup Global, local variables
  */
  Setup.config();

  /*!
  *  await for the startup functions because these will be async
  */
  await Startup.beforeStart();

  /*!
   *  await for launch server script
   */
  await Application.start();

  /*!
   *  process handlers
   */

  //  catches when process exits
  process.on('exit', Handlers.onExit.bind(null, {cleanup: true}));

  //  catches ctrl+c
  process.on('SIGINT', Handlers.onExit.bind(null, {cleanup: true, exit: true}));

  //  catches uncaught exceptions
  process.on('uncaughtException', Handlers.onExit.bind(null, {exit:true}));
}()).then(null, (err) => {
  Handlers.onError(err);
});

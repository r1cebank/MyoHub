/**
 * setup
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */


import Winston          from 'winston';
import AppSingleton     from './appsingleton';

function config() {
  //  Creating a new shared instance for winston logger
  const sharedInstance = AppSingleton.getInstance();
  sharedInstance.log = new (Winston.Logger)({
    transports: [
      new (Winston.transports.Console)({
        colorize    : 'all',
        level       : 'verbose'
      })
    ]
  });
  //  define custom logging functions
  sharedInstance.L = {
    verbose :   (tag, log) => {sharedInstance.log.verbose(`[${tag}] : ${log}`);},
    info    :   (tag, log) => {sharedInstance.log.info(`[${tag}] : ${log}`);},
    error   :   (tag, log) => {sharedInstance.log.error(`[${tag}] : ${log}`);},
    warn    :   (tag, log) => {sharedInstance.log.warn(`[${tag}] : ${log}`);}
  };
}

export default {config};

/**
 * setup
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */


import Winston          from 'winston';
import Express          from 'express';
import HTTP             from 'http';
import BodyParser       from 'body-parser';
import Fs               from 'fs';
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
  //  Express application variable
  const app = Express();
  sharedInstance.app = app;
  sharedInstance.port = 3939;
  sharedInstance.server = HTTP.createServer(sharedInstance.app);
  //  Start the socket.io server
  sharedInstance.io = require('socket.io')(sharedInstance.server);
  sharedInstance.myoClient = sharedInstance.io.of('/myoclient');
  sharedInstance.myoConsumer = sharedInstance.io.of('/myoconsumer');
  app.use(BodyParser.json()); //  Using bodyparser for POST requests
  app.use(BodyParser.urlencoded({ extended: false }));
  //  Create a socket pool
  sharedInstance.myos = [];
  sharedInstance.myoData = {};
  //  Reading the private key
  sharedInstance.cert = Fs.readFileSync(__dirname + '/../../private.pem');
  sharedInstance.public = Fs.readFileSync(__dirname + '/../../public.pem');
}

export default {config};

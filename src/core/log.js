
/*
  log
  Author: yuhan.wyh<yuhan.wyh@alibaba-inc.com>
  Create: Mon Jul 31 2017 06:37:05 GMT+0800 (CST)
*/

"use strict";

let log = null;

class Log {

  init( log ) {
    this.log = log;
  }

  info() {
    this.info.apply( this.log, arguments );
  }

  debug() {
    this.debug.apply( this.log, arguments );
  }

  warn() {
    this.warn.apply( this.log, arguments );
  }

  error() {
    this.error.apply( this.log, arguments );
  }

}

module.exports = () => {

  if ( null == log ) {
    log = new Log();
  }

  return log;

}

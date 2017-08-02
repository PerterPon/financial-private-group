
/*
  index
  Author: yuhan.wyh<yuhan.wyh@alibaba-inc.com>
  Create: Mon Jul 31 2017 08:31:59 GMT+0800 (CST)
*/

"use strict";

const db  = require( './core/db' )();
const log = require( './core/log' )();

class Index {

  constructor( options, log ) {
    this.options = options;
    this.log     = log;
    this.init();
  }

  init() {
    let options = this.options;
    log.init( this.log );
    db.init( this.options.database, this.log );
  }

}

module.exports = ( options, log ) => {

  return new Index( options, log );

}

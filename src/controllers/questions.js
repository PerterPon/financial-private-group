
/*
  questions
  Author: yuhan.wyh<yuhan.wyh@alibaba-inc.com>
  Create: Mon Jul 31 2017 06:33:38 GMT+0800 (CST)
*/

"use strict";

class Questions {

  constructor( options, log ) {
    this.options = options;
    this.log     = log;
  }

}

module.exports = ( options, log ) => {
  return new Questions( options, log );
}

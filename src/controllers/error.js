
/*
  error
  Author: yuhan.wyh<yuhan.wyh@alibaba-inc.com>
  Create: Mon Jul 31 2017 03:28:37 GMT+0800 (CST)
*/

"use strict";

const os   = require( 'options-stream' );
const path = require( 'path' );

let errorCodes = null;

class Error {

  constructor( options, log ) {
    this.log     = log;
    this.options = options;
    this.initErrorCodes();
  }

  initErrorCodes() {
    let filePath = path.join( __dirname, '../../etc/errors.yaml' );
    errorCodes   = os( filePath ).errors;
  }

  middleware() {
    let log = this.log;
    return function *( req, res, next ) {
      try {
        yield next;
      } catch ( e ) {

        let message = e.message;
        let errCode = e.errorCode;
        let errMsg  = e.errorMessage;
        let resCode = e.responseCode;
        let stack   = e.stack;
        let logLevel = e.logLevel || 'error';

        resCode     = resCode || 500;

        let errorItem = errorCodes[ errCode ];
        if ( void( 0 ) == errorItem ) {
          errorItem   = errorCodes[ 'UNKNOW_ERROR' ];
        }

        if ( void( 0 ) != errMsg ) {
          errorItem.errorMessage = errMsg;
        }

        errorItem.success = false;

        let resContent = JSON.stringify( errorItem );
        log[ logLevel ]( `[ERROR-MIDDLEWARE] error catched, error message: [${message}], item: [${resContent}]` );
        if ( 'error' === logLevel ) {
          log[ logLevel ]( `--------------` );
          log[ logLevel ]( stack );  
        }
        
        res.setHeader( 'Content-Type', 'application/json; charset=UTF-8' );
        res.setHeader( 'status', resCode );
        res.end( resContent );
      }
    }
  }

}

module.exports = ( options, log ) => {
  return new Error( options, log );
}


/*
  response
  Author: yuhan.wyh<yuhan.wyh@alibaba-inc.com>
  Create: Mon Jul 31 2017 09:31:55 GMT+0800 (CST)
*/

"use strict";

class Response {

  middleware() {
    return function *( req, res, next ) {
      res.data = function ( data ) {
        res.end( JSON.stringify( {
          success : true,
          data    : data
        } ) );
      }

      yield next;
    }
  }

}

module.exports = () => {

  return new Response();

}

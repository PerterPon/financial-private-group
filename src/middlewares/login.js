
/*
  login
  Author: yuhan.wyh<yuhan.wyh@alibaba-inc.com>
  Create: Mon Jul 31 2017 03:24:47 GMT+0800 (CST)
*/

"use strict";

class Login {

  middleware() {
    return function *( req, res, next ) {

      req.user = {
        id   : 1,
        nick : 'test_user'
      }

      yield next;

    }
  }

}

module.exports = ( options, log ) => {

  return new Login( options, log );

}

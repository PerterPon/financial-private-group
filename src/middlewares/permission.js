
/*
  permission
  Author: yuhan.wyh<yuhan.wyh@alibaba-inc.com>
  Create: Mon Jul 31 2017 03:24:45 GMT+0800 (CST)
*/

"use strict";

let log = require( '../core/log' )();
let permissionModule = require( '../modules/permission' );
let userModule       = require( '../modules/user' );

class Permission {

  middleware() {
    return function *( req, res, next ) {
      let user        = req.user;
      let userId      = user.id;

      let userInfo    = yield userModule.getUserById( userId );

      // 新增用户
      if ( 0 === userInfo.length ) {
        yield userModule.createUser( userId );
        yield permissionModule.addRole2User( 'NORMAL', userId );
      }

      let permissions = yield permissionModule.getPermissionByUserId( userId );
      req.permissions = permissions;
      console.log( permissions );
      yield next;
    }
  }

}


module.exports = ( options, log ) => {
  return new Permission( options, log );
}

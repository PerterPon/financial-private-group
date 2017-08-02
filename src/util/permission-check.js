
/*
  permission-check
  Author: yuhan.wyh<yuhan.wyh@alibaba-inc.com>
  Create: Wed Aug 02 2017 09:23:25 GMT+0800 (CST)
*/

"use strict";

const groupModule = require( '../modules/group' );

module.exports = {

  *checkRequestPermission( targetPermission, req, groupUUID ) {
    let groupId = null;
    console.log( groupUUID, '====' );
    if ( void( 0 ) != groupUUID ) {
      let groupInfo = yield groupModule.getGroupByUUID( groupUUID );
      groupId       = groupInfo.id;
    }
    
    yield module.exports.checkRequestPermissionWithGroupId( targetPermission, req, groupId );
  },

  *checkRequestPermissionWithGroupId( targetPermission, req, groupId ) {
    let reqPermission = req.permissions;
    let permissions   = null;
    if ( void( 0 ) == groupId ) {
      permissions     = reqPermission.commonPermissions;
    } else {
      permissions     = reqPermission[ groupId ].groupPermissions;
    }

    console.log( permissions, '------' );
    module.exports.checkPermission( targetPermission, permissions );  
  },

  checkPermission( targetPermission, permissions ) {
    if ( -1 === permissions.indexOf( targetPermission ) ) {
      let error = new Error( 'no permission' );
      error.errorCode    = 'NO_PERMISSION';
      error.responseCode = 403;
      error.logLevel     = 'info';
      throw error;
    }
  }

};

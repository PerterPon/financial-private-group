
/*
  group
  Author: yuhan.wyh<yuhan.wyh@alibaba-inc.com>
  Create: Mon Jul 31 2017 03:16:35 GMT+0800 (CST)
*/

"use strict";

const groupModule = require( '../modules/group' );
const permissionModule  = require( '../modules/permission' );
const permissionChecker = require( '../util/permission-check' );

class Group {

  constructor( options, log ) {
    this.options = options;
    this.log     = log;
  }

  createGroup() {
    return function *( req, res, next ) {
      let user   = req.user;
      let userId = user.id;
      let query  = req.body;
      let name   = query.name;
      let type   = 1;
      let allowPost = query.allowPost;

      let groupId = yield groupModule.createGroup( userId, name, type, allowPost );
      yield permissionModule.addRole2User( 'MEMBER', userId, groupId );
      yield permissionModule.addRole2User( 'CREATOR', userId, groupId );
      res.data( 'ok' );
    }
  }

  getGroups() {
    return function *( req, res, next ) {
      let permissions = req.permissions;
      let user        = req.user;
      let userId      = user.id;
      let groups      = yield groupModule.getGroups( userId );

      res.data( groups );
    }
  }

  deleteGroup() {
    return function *( req, res, next ) {

    }
  }

  modifyGroup() {
    return function *( req, res, next ) {

    }
  }

  searchGroup() {
    return function *( req, res, next ) {

    }
  }

  setAnnouncement() {
    return function *( req, res, next ) {
      let body   = req.body;
      let user   = req.user;
      let userId = user.id;
      let announcement = body.announcement;
      let groupUUID    = body.groupUUID;

      try {
        yield permissionChecker.checkRequestPermission( 'MODIFY_ANNOUNCEMENT', req, groupUUID );  
      } catch ( e ) {
        if ( 'NO_PERMISSION' === e.errorCode ) {
          e.message  = `[CONTROLLER GROUP] user: [${userId}] trying to set announcement to group: [${groupUUID}] but do not have permission`;
        }
        throw e;
      }

      yield groupModule.setAnnouncement( groupUUID, announcement, userId );

      res.data( 'ok' );
    }
  }

  applyGroup() {
    return function *( req, res, next ) {
      let body      = req.body;
      let user      = req.user;
      let userId    = user.id;
      let groupUUID = body.groupUUID;
      let reason    = body.reason;

      let result    = yield permissionChecker.checkIfUserBelone2Group( userId, groupUUID );
      if ( true === result ) {
        let error   = new Error( `[CONTROLLER GROUP] user: [${userId}] trying to apply group: [${groupUUID}] but was allready belone to it.` );
        error.errorCode = 'WRONG_APPLY';
        error.logLevel  = 'info';
      }
      yield permissionChecker.checkRequestPermission( 'APPLY_GROUP', req, groupUUID );
      yield groupModule.applyGroup( userId, groupUUID, reason );

      res.data( 'ok' );
    }
  }

}

module.exports = ( options, log ) => {
  return new Group( options, log );
}


/*
  group
  Author: yuhan.wyh<yuhan.wyh@alibaba-inc.com>
  Create: Mon Jul 31 2017 03:59:11 GMT+0800 (CST)
*/

"use strict";

const db = require( '../core/db' )();
const groupModel       = require( '../models/group' );
const permissionModel  = require( '../models/permission' );
const permissionModule = require( './permission' );

class Group {

  *getGroups( userId ) {
    let sql = groupModel.getGroups;

    let res = yield db.query( sql, [ userId ] );
    return res;
  }

  *getGroupByUUID( UUID ) {
    let sql = groupModel.getGroupByUUID;
    let res = yield db.query( sql, [ UUID ] );

    return res[ 0 ];
  }

  *createGroup( userId, name, type, allowPost ) {
    let createGroupSql = groupModel.createGroup;
    let groupUserSql   = groupModel.bindGroup2User;

    let groupUserData  = [ null, userId ];
    let groupId        = null;
    let operations = [ {
      sql   : createGroupSql,
      where : [ name, type, null, userId, allowPost ],
      cb    : function ( data ) {
        groupId = data.insertId;
        groupUserData[ 0 ] = groupId;
      }
    }, {
      sql   : groupUserSql,
      where : groupUserData
    } ];

    yield db.transactionQuery( operations );
    return groupId;
  }

  *deleteGroup( groupId, userId ) {
    let sql = groupModel.deleteGroup;
    let res = yield db.query( sql, [ groupId, userId ] );
  }

  *modifyGroup() {

  }

  *searchGroup() {

  }

  *setAnnouncement( groupUUID, announcement, userId ) {
    let groupInfo = yield this.getGroupByUUID( groupUUID );
    let groupId   = groupInfo.id;

    return yield this.setAnnouncementByGroupId( groupId, announcement, userId );
  }

  *setAnnouncementByGroupId( groupId, announcement, userId ) {
    let sql = groupModel.setAnnouncement;
    yield db.query( sql, [ announcement, userId, groupId ] );
  }

  *getAnnouncement( groupId, userId ) {

  }

  *applyGroupWithUUID( userId, groupUUID, reason ) {
    let groupInfo = yield this.getGroupByUUID( groupUUID );
    let groupId   = groupInfo.id;

    yield this.applyGroup( userId, groupId, reason );
  }

  *applyGroup( userId, groupId, reason ) {
    let sql = groupModel.applyGroup;
    yield db.query( sql, [ userId, groupId, reason ] );
  }

}

module.exports = new Group;
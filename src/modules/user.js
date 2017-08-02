
/*
  user
  Author: yuhan.wyh<yuhan.wyh@alibaba-inc.com>
  Create: Tue Aug 01 2017 07:22:56 GMT+0800 (CST)
*/

"use strict";

const userModel = require( '../models/user' );
const db        = require( '../core/db' )();

class User {

  *getUserById( userId ) {
    let sql = userModel.getUserById;
    let res = yield db.query( sql, [ userId ] );
    return res;
  }

  *createUser( userUUID ) {
    let sql    = userModel.createUser;
    let res    = yield db.query( sql, [ userUUID ] );
    let userId = res.insertId;
    return userId;
  }

}

module.exports = new User;

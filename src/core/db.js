
/*
  db
  Author: yuhan.wyh<yuhan.wyh@alibaba-inc.com>
  Create: Mon Jul 31 2017 08:34:54 GMT+0800 (CST)
*/

"use strict";

const FreshMysql = require( 'fresh-mysql' );
const thunkify   = require( 'thunkify' );

let db = null;

module.exports = () => {

  if ( null == db ) {
    db = new FreshMysql();
    db.query = thunkify( db.query.bind( db ) );
    db.transactionQuery = thunkify( db.transactionQuery.bind( db ) );
  }

  return db;

}


/*
  user
  Author: yuhan.wyh<yuhan.wyh@alibaba-inc.com>
  Create: Tue Aug 01 2017 07:24:43 GMT+0800 (CST)
*/

"use strict";

const GET_USER_BY_ID = `
SELECT 
  id,
  user_id,
  nick,
  uuid
FROM
  user
WHERE
  user_id    = ?;
`;

const CREATE_USER = `
INSERT INTO user (
  user_id,
  uuid
)
VALUES (
  ?,
  UUID()
);
`;

module.exports = {
  getUserById : GET_USER_BY_ID,
  createUser  : CREATE_USER
}

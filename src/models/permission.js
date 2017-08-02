
/*
  permission
  Author: yuhan.wyh<yuhan.wyh@alibaba-inc.com>
  Create: Tue Aug 01 2017 07:48:30 GMT+0800 (CST)
*/

"use strict";

const GET_ROLE_BY_USER_ID = `
SELECT
  user_permission.user_id  AS user_id,
  user_permission.role_id  AS role_id,
  user_permission.group_id AS group_id
FROM
  user_permission
WHERE
  user_id    = ? AND
  is_deleted = 0;
`;

const GET_ROLE_DETAIL = `
SELECT
  id,
  name
FROM
  role
WHERE
  is_deleted = 0;
`;

const GET_PERMISSION_DETAIL = `
SELECT
  id,
  name
FROM
  permissions
WHERE
  is_deleted = 0;
`;

const GET_RELATIONSHIP_WITH_ROLE_AND_PERMISSION = `
SELECT 
  permission_id,
  role_id
FROM
  role_permission
WHERE
  is_deleted = 0;
`;

const ADD_ROLE_2_USER = `
INSERT INTO user_permission(
  user_id,
  role_id,
  group_id
)
VALUES (
  ?,
  ?,
  ?
)
`;

module.exports = {
  getRoleByUserId                      : GET_ROLE_BY_USER_ID,
  getRoleDetail                        : GET_ROLE_DETAIL,
  getPermissionDetail                  : GET_PERMISSION_DETAIL,
  getRelationshipWithRoleAndPermission : GET_RELATIONSHIP_WITH_ROLE_AND_PERMISSION,
  addRole2User                         : ADD_ROLE_2_USER
};

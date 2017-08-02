
/*
  group
  Author: yuhan.wyh<yuhan.wyh@alibaba-inc.com>
  Create: Mon Jul 31 2017 06:25:57 GMT+0800 (CST)
*/

"use strict";

const GET_GROUPS = `
SELECT 
  groups.name         AS group_name,
  groups.type         AS group_type,
  groups.announcement AS group_announcement,
  groups.user_id      AS group_owner,
  groups.id           AS group_id,
  groups.uuid         AS uuid,
  groups.allow_post   AS allow_post
FROM
  groups
LEFT JOIN
  group_user
ON
  group_user.group_id   = groups.id
WHERE
  group_user.id         = ? AND
  group_user.is_deleted = 0 AND
  groups.is_deleted     = 0
ORDER BY
  groups.create_time DESC;
`;

const GET_GROUP_BY_UUID = `
SELECT
  id,
  name,
  allow_post,
  type
FROM
  groups
WHERE
  uuid       = ? AND
  is_deleted = 0;
`;

const CREATE_GROUP = `
INSERT INTO groups (
  name,
  type,
  announcement,
  user_id,
  uuid,
  allow_post
)
VALUES(
  ?,
  ?,
  ?,
  ?,
  UUID(),
  ?
);
`;

const BIND_GROUP_2_USER = `
INSERT INTO group_user (
  group_id,
  user_id
)
VALUES (
  ?,
  ?
)
`;

const DELETE_GROUP = `
UPDATE
  groups
SET
  is_deleted = 1
WHERE
  user_id    = ? AND
  is_deleted = 0;
`;

const RELEASE_GROUP_4_USER = `
UPDATE
  group_user
SET
  is_deleted = 1
WHERE
  group_id   = ? AND
  is_deleted = 0;
`;

const APPLY_GROUP = `
INSERT INTO apply_group (
  applyer_id,
  group_id,
  reason
)
VALUES (
  ?,
  ?,
  ?
)
`;

const SET_ANNOUNCEMENT = `
UPDATE
  groups
SET
  announcement          = ?,
  announcement_modifier = ?
WHERE
  id         = ? AND
  is_deleted = 0;
`;

module.exports = {
  getGroups         : GET_GROUPS,
  getGroupByUUID    : GET_GROUP_BY_UUID,
  createGroup       : CREATE_GROUP,
  bindGroup2User    : BIND_GROUP_2_USER,
  deleteGroup       : DELETE_GROUP,
  releaseGroup4User : RELEASE_GROUP_4_USER,
  applyGroup        : APPLY_GROUP,
  setAnnouncement   : SET_ANNOUNCEMENT
}


/*
  permission
  Author: yuhan.wyh<yuhan.wyh@alibaba-inc.com>
  Create: Mon Jul 31 2017 08:52:49 GMT+0800 (CST)
*/

"use strict";

const permissionModel = require( '../models/permission' );
const db = require( '../core/db' )();
const co = require( 'co' );

class Permission {

  *getPermissionByUserId( userId ) {
    yield this.initRolePermission();

    let sql = permissionModel.getRoleByUserId;
    let res = yield db.query( sql, [ userId ] );
    let permissions    = {};

    let allRoles = [];
    let singleRoles = [];
    for ( let i = 0; i < res.length; i ++ ) {
      let item     = res[ i ];
      let roleId   = item.role_id;
      let groupId  = item.group_id;
      let roleName = this.roles[ roleId ];
      allRoles.push( roleName );
      if ( null == groupId ) {
        singleRoles.push( roleId );
        continue;
      }

      let roles   = permissions[ groupId ];
      if ( void( 0 ) == roles ) {
        roles     = [];
        permissions[ groupId ] = roles;
      }

      roles.push( roleId );
    }

    let allPermissions = [];
    let userPermission = {};
    for( let groupId in permissions ) {
      let roles = permissions[ groupId ];
      let rolePermission   = {};
      userPermission[ groupId ] = rolePermission;
      let groupPermissions = [];
      for ( let i = 0; i < roles.length; i ++ ) {
        let roleId   = roles[ i ];
        let roleName = this.roles[ roleId ];
        let permissionNames = this.fetchPermissionFromRole( roleId );
        rolePermission[ roleName ] = permissionNames;
        groupPermissions = groupPermissions.concat( permissionNames );
        allPermissions   = allPermissions.concat( permissionNames );
      }
      rolePermission.groupPermissions = groupPermissions;
    }

    let commonPermissions = [];
    for ( let i = 0; i < singleRoles.length; i ++ ) {
      let roleId   = singleRoles[ i ];
      let roleName = this.roles[ roleId ];
      let permissionNames = this.fetchPermissionFromRole( roleId );
      allPermissions      = allPermissions.concat( permissionNames );
      commonPermissions   = commonPermissions.concat( permissionNames );
    }

    userPermission.commonPermissions = commonPermissions;
    userPermission.allPermissions    = allPermissions;
    userPermission.allRoles          = allRoles;
    return userPermission;
  }

  *addRole2User( roleName, userId, groupId ) {
    yield this.initRolePermission();
    let roleId = this.roleNameMap[ roleName ];
    yield this.addRole2UserByRoleId( roleId, userId, groupId );
  }

  *addRole2UserByRoleId( roleId, userId, groupId ) {
    let sql    = permissionModel.addRole2User;
    yield db.query( sql, [ userId, roleId, groupId ] );
  }

  *deleteRoleFromUser( roleName, user ) {
    yield this.initRolePermission();

  }

  fetchPermissionFromRole( roleId ) {
    let roleName    = this.roles[ roleId ];
    let permissions = this.relationships[ roleId ];

    let permissionNames  = [];
    for ( let j = 0; j < permissions.length; j ++ ) {
      let permissionId   = permissions[ j ];
      let permissionName = this.permissions[ permissionId ];
      permissionNames.push( permissionName );
    }

    return permissionNames;
  }

  *getRoleIdByName( roleName ) {
    yield this.initRolePermission();
    return this.roleNameMap[ roleName ];
  }

  *initRolePermission() {
    if ( void( 0 ) == this.permissions ) {
      let sql = permissionModel.getPermissionDetail;
      let permission = yield db.query( sql, [] );
      let permissions  = {};
      let permissionNameMap = {};
      for ( let i = 0; i < permission.length; i ++ ) {
        let item = permission[ i ];
        let id   = item.id;
        let name = item.name;
        permissions[ id ] = name;
        permissionNameMap[ name ] = id;
      }
      this.permissionNameMap = permissionNameMap;
      this.permissions = permissions;
    }

    if ( void( 0 ) == this.roles ) {
      let sql   = permissionModel.getRoleDetail;
      let role  = yield db.query( sql, [] );
      let roles = {};
      let roleNameMap = {};
      for( let i = 0; i < role.length; i ++ ) {
        let item = role[ i ];
        let id   = item.id;
        let name = item.name;
        roles[ id ] = name;
        roleNameMap[ name ] = id;
      }
      this.roleNameMap = roleNameMap;
      this.roles = roles;
    }

    if ( void( 0 ) == this.relationships ) {
      let sql = permissionModel.getRelationshipWithRoleAndPermission;
      let relationship  = yield db.query( sql, [] );
      let relationships = {};
      for ( let i = 0; i < relationship.length; i ++ ) {
        let item         = relationship[ i ];
        let roleId       = item.role_id;
        let permissionId = item.permission_id;
        let permissions  = relationships[ roleId ];
        if ( void( 0 ) == permissions ) {
          permissions    = [];
          relationships[ roleId ] = permissions;
        }

        permissions.push( permissionId );
      }

      this.relationships = relationships;
    }
  }

}

module.exports = new Permission;

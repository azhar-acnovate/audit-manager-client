// RoleBasedComponent.js
import React from 'react';
import { useUser } from '../context/UserContext';

function RoleBasedComponent({ allowedRoles, children, replace }) {
  const { user } = useUser();

  //const hasPermission = user!=null && user.roles!=null &&  allowedRoles.some(role => user.roles.includes(role));
  const hasPermission = user.userRole === allowedRoles
  return hasPermission ? <>{children}</> : replace;
}

export default RoleBasedComponent;

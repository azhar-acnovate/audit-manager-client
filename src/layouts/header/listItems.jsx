import React from "react";
import RoleBasedComponent from "../../components/RoleBasedComponent";
import CustomListItem from "./CustomListItem";

export const mainListItems = (

    <React.Fragment>
        <CustomListItem to="/" primary="Dashboard" icon={'Dashboard'} />
    </React.Fragment>

);

export const secondaryListItems = (
    <React.Fragment>
        <RoleBasedComponent allowedRoles={['ADMIN']}>
            {/* <CustomListItem to="/settings" primary="Settings" icon={'Settings'} /> */}
        </RoleBasedComponent>
    </React.Fragment>

);
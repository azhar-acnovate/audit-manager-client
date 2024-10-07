// import { Navigate, Route, Routes as RoutesRRD } from 'react-router-dom';
// import RoleBasedComponent from './components/RoleBasedComponent';



// const Routes = () => {


//     return (<RoutesRRD >
//         <Route exact path="/" element={<></>} />
//         <Route
//             path="*"
//             element={<Navigate to="/" replace={true} />}
//         />
//     </RoutesRRD>);
// };


// export default Routes;



/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.
  Once you add a new route on this file it will be visible automatically on
  the Sidenav.
  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Argon Dashboard 2 MUI layouts
import Dashboard from "./layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import VirtualReality from "layouts/virtual-reality";
// import RTL from "layouts/rtl";
// import Profile from "layouts/profile";
// import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";
// Argon Dashboard 2 MUI components
import ArgonBox from "./components/ArgonBox";
import Login from "./layouts/authentication/Login";
import DashboardLayout from "./examples/LayoutContainers/DashboardLayout";
import { Checklist, ContactPage, ImportExport, Schedule, Source, Storage, VerifiedUser } from "@mui/icons-material";
import ViewAuditHome from "./layouts/view-audit/ViewAuditHome";
import CreateOrUpdateAudit from "./layouts/view-audit/CreateOrUpdateAudit";
import CreateOrUpdateUser from "./layouts/view-user/CreateOrUpdateUser";
import ViewUserHome from "./layouts/view-user/ViewUserHome";
import SessionExpired from "./layouts/authentication/SessionExpired";
import ReportsHome from "./layouts/reporting/ReportsHome";
import ExportReportsHome from "./layouts/export-reports/ExportReportsHome";
import SchedulingReportsHome from "./layouts/scheduling-reports/SchedulingReportsHome";
import CreateOrUpdateAuditReport from "./layouts/reporting/components/CreateOrUpdateAuditReport";
import SourceReferenceHome from "./layouts/source-reference/SourceReferenceHome";
import CreateOrUpdateSourceReference from "./layouts/source-reference/CreateOrUpdateSourceReference";

const menuRoutes = [
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "Audit Planning Module",
    key: "audit-log-activities",
    route: "/audit-log-activities",
    icon: <VerifiedUser color="primary" fontSize="14px"/>,
    component: <ViewAuditHome></ViewAuditHome>,
  },
  {
    type: "route",
    name: "Master Data Management",
    key: "master-data-management",
    icon: <Storage color="primary" fontSize="14px" />,
    collapse: [
      {
        type: "route",
        name: "User Data Management",
        key: "user-data",
        route: "/master-data-management/user-data",
        icon: <ContactPage color="primary" fontSize="14px" />,
        component: <ViewUserHome><></></ViewUserHome>,
      },
      {
        type: "route",
        name: "Source Reference",
        key: "user-data",
        route: "/master-data-management/source-reference",
        icon: <Source color="primary" fontSize="14px" />,
        component: <SourceReferenceHome></SourceReferenceHome>,
      },
      // Add more submenu items here if needed
    ],
  },
  {
    type: "route",
    name: "Export Audit Report",
    key: "export-audit-report",
    route: "/export-audit-report",
    icon: <ImportExport color="primary" fontSize="14px"></ImportExport>    ,
    component:  <ExportReportsHome></ExportReportsHome>,
  },
  {
    type: "route",
    name: "Scheduling Audit Report",
    key: "scheduling-audit-report",
    route: "/scheduling-audit-report",
    icon: <Schedule color="primary" fontSize="14px"></Schedule>    ,
    component:  <SchedulingReportsHome><></></SchedulingReportsHome>,
  },

  {
    type: "route",
    name: "Reporting",
    key: "reporting",
    route: "/reporting",
    icon: <Checklist color="primary" fontSize="14px"></Checklist>    ,
    component:  <ReportsHome></ReportsHome>,
  },
]
const routes = [
  ...menuRoutes,
  {
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-copy-04" />
    ),
    component: <Login />,
  },
  {
    name: "Session Expired",
    key: "session-expired",
    route: "/authentication/session-expired",
    component: <SessionExpired />,
  },
  {
    name: "Audit Planning Module",
    key: "audit-log-activities",
    route: "/audit-log-activities/create",
    component: <CreateOrUpdateAudit />,
  },
  {
    name: "Audit Planning Module",
    key: "audit-log-activities",
    route: "/audit-log-activities/update/:encodedId",
    component: <CreateOrUpdateAudit />,
  },
  {
    name: "Master Data Management Module",
    key: "master-data-management",
    route: "/master-data-management/user-data/create",
    component: <CreateOrUpdateUser />,
  },
  {
    name: "Master Data Management Module",
    key: "master-data-management",
    route: "/master-data-management/update/:encodedId",
    component: <CreateOrUpdateUser />,
  },
  {
    name: "Reporting",
    key: "reporting",
    route: "/reporting/create",
    component: <CreateOrUpdateAuditReport />,
  },
  {
    name: "Reporting",
    key: "reporting",
    route: "/reporting/update/:encodedId",
    component: <CreateOrUpdateAuditReport />,
  },
  {
    name: "Master Data Management Module",
    key: "master-data-management",
    route: "/master-data-management/source-reference/create",
    component: <CreateOrUpdateSourceReference />,
  },
  {
    name: "Master Data Management Module",
    key: "master-data-management",
    route: "/master-data-management/source-reference/update/:encodedId",
    component: <CreateOrUpdateSourceReference />,
  },
  
];

export default routes;

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
import { useState, useEffect } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import Collapse from "@mui/material/Collapse";
import ArgonBox from "../../components/ArgonBox";
import ArgonTypography from "../../components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import SidenavItem from "./SidenavItem";
import SidenavRoot from "./SidenavRoot";
import { useArgonController, setMiniSidenav } from "../../context";
import { useUser } from "../../context/UserContext";

function Sidenav({ color = "info", brand = "", brandMini, routes, ...rest }) {
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, darkSidenav, layout } = controller;
  const location = useLocation();
  const { pathname } = location;
  const { user } = useUser();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    /** 
    The event listener that's calling the handleMiniSidenav function when resizing the window.
   */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  const handleSubmenuClick = (key, hasCollapse) => {
    if (hasCollapse) {
      setOpenSubmenu((prevKey) => (prevKey === key ? null : key));
    } else {
      setOpenSubmenu(null);
    }
  };

  const renderRoutes = routes.map(({ type, name, icon, title, key, href, route, collapse, role }) => {
    let returnValue;
    const isActive = pathname.includes(route); // Check if current pathname includes the route

    if (type === "route") {

      if (role && user.userRole !== role) {

        return returnValue;
      }
      if (collapse) {
        returnValue = (
          <ArgonBox key={key}>
            <SidenavItem
              name={name}
              icon={icon}
              active={isActive}
              open={openSubmenu === key}
              onClick={() => handleSubmenuClick(key, true)}
            />
            <Collapse in={openSubmenu === key}>
              <List component="div" disablePadding>
                {collapse.map((subItem) => {

                  if (subItem.role && user.userRole !== subItem.role) {

                    return returnValue;
                  }
                  return <NavLink to={subItem.route} key={subItem.key}>
                    <SidenavItem
                      name={subItem.name}
                      icon={subItem.icon}
                      active={pathname === subItem.route} // Check if pathname matches the subItem route
                      style={{ paddingLeft: "2rem" }}
                    />
                  </NavLink>
                })}
              </List>
            </Collapse>
          </ArgonBox>
        );
      } else if (href) {
        returnValue = (
          <Link href={href} key={key} target="_blank" rel="noreferrer">
            <SidenavItem name={name} icon={icon} active={isActive} />
          </Link>
        );
      } else {
        returnValue = (
          <NavLink to={route} key={key} onClick={() => handleSubmenuClick(key, false)}>
            <SidenavItem name={name} icon={icon} active={isActive} />
          </NavLink>
        );
      }
    } else if (type === "title") {
      returnValue = (
        <ArgonTypography
          key={key}
          color={darkSidenav ? "white" : "dark"}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          opacity={0.6}
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </ArgonTypography>
      );
    } else if (type === "divider") {
      returnValue = <Divider key={key} light={darkSidenav} />;
    }

    return returnValue;
  });

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ darkSidenav, miniSidenav, layout }}>
      <ArgonBox pt={3} pb={1} px={4} textAlign="center">
        <ArgonBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <ArgonTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && (
            <ArgonBox
              component="img"
              src={miniSidenav ? brandMini : brand}
              alt="Argon Logo"
              width={miniSidenav ? "3rem" : "12rem"}
              height={miniSidenav ? "3rem" : "6rem"}
              borderRadius="lg"
            />
          )}
        </ArgonBox>
      </ArgonBox>
      <Divider light={darkSidenav} />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandMini: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;

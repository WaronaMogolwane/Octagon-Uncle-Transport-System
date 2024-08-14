import PropTypes from "prop-types";
import React from "react";
import { ListGroup } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import NavGroup from "./NavGroup";
import NavCard from "./NavCard";

const NavContent = ({ navigation }: any) => {
  const navItems = navigation.map((item: any) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={"nav-group-" + item.id} group={item} />;
      default:
        return false;
    }
  });

  let mainContent: any = "";

  mainContent = (
    <div className="navbar-content datta-scroll">
      <PerfectScrollbar>
        <ListGroup
          variant="flush"
          as="ul"
          bsPrefix=" "
          className="nav pcoded-inner-navbar"
          id="nav-ps-next"
        >
          {navItems}
        </ListGroup>
        {/* <NavCard /> */}
      </PerfectScrollbar>
    </div>
  );

  return <React.Fragment>{mainContent}</React.Fragment>;
};

NavContent.propTypes = {
  navigation: PropTypes.array,
};

export default NavContent;

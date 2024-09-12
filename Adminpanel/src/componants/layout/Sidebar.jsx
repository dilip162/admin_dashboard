import "../css/Dashboard.css";

import { Link } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";
import { RiPagesFill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
const SidebarMenu = () => {
  return (
    <>
      <Sidebar>
        <Menu className="sidemenu">
          <MenuItem
            className="nav-link"
            icon={<MdDashboard />}
            component={<Link to="/admin/dashboard" />}
          >
            {" "}
            Dashboard{" "}
          </MenuItem>
          <SubMenu
            label="User Managment"
            icon={<IoPerson />}
            className="nav-link"
          >
            <MenuItem
              component={<Link to="/admin/users" />}
              icon={<IoPerson />}
            >
              Users
            </MenuItem>
            <MenuItem
              component={<Link to="/admin/addnewuser" />}
              icon={<IoPersonAdd />}
            >
              {" "}
              Add New User{" "}
            </MenuItem>
          </SubMenu>

          {/* ------------- Pages ----------------------- */}

          <SubMenu
            label="Pages Managment"
            icon={<RiPagesFill />}
            className="nav-link"
          >
            <MenuItem
              component={<Link to="pages/view" />}
              icon={<RiPagesFill />}
            >
              Pages
            </MenuItem>
            <MenuItem component={<Link to="pages/add" />} icon={<MdAdd />}>
              {" "}
              Add New{" "}
            </MenuItem>
          </SubMenu>

          {/* ------------- Category ----------------------- */}
          <SubMenu
            label="Category Managment"
            icon={<RiPagesFill />}
            className="nav-link"
          >
            <MenuItem
              component={<Link to="/admin/category/view" />}
              icon={<RiPagesFill />}
            >
              Categories
            </MenuItem>
            <MenuItem
              component={<Link to="/admin/category/create" />}
              icon={<MdAdd />}
            >
              {" "}
              Add New{" "}
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SidebarMenu;

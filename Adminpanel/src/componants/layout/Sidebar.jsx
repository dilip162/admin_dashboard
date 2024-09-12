import "../css/Dashboard.css";
import {ArrowRight, BarChart, BoxArrowDownRight, CardList, ChevronBarDown, ChevronDown, Circle, DashCircle, Envelope, FileEarmark, Gem, Grid, JournalText, LayoutTextWindowReverse, MenuButtonWide, Person, QuestionCircle} from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import { IoPersonAdd } from "react-icons/io5";
import { RiPagesFill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
const SidebarMenu = () => {
  
  return (
    <> 
<Sidebar>
  <Menu className="sidemenu">
  <MenuItem className="nav-link" icon={<MdDashboard />} component={<Link to="/admin/dashboard" />}> Dashboard </MenuItem>
      <SubMenu label="User Managment" icon={<IoPerson />} className="nav-link">
      <MenuItem component={<Link to="/admin/users" />} icon={<IoPerson />}>Users</MenuItem>
      <MenuItem component={<Link to="/admin/addnewuser" />} icon={<IoPersonAdd />} > Add New User </MenuItem>
    </SubMenu>
    <SubMenu label="Page Managment" icon={<RiPagesFill />} className="nav-link">
      <MenuItem component={<Link to="/admin/pages" />} icon={<RiPagesFill />}>Pages</MenuItem>
      <MenuItem component={<Link to="/admin/addnewpage" />} icon={<MdAdd />}> Add New Page </MenuItem>
    </SubMenu>
    <SubMenu label="Post Managment" icon={<RiPagesFill />} className="nav-link">
      <MenuItem component={<Link to="/admin/posts" />} icon={<RiPagesFill />}>Posts</MenuItem>
      <MenuItem component={<Link to="/admin/addnewpost" />} icon={<MdAdd />}> Add New Post </MenuItem>
    </SubMenu>
  </Menu>
</Sidebar>
    </>
  );
};

export default SidebarMenu;

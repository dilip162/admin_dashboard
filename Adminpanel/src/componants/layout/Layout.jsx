import { Outlet } from "react-router-dom";
import SidebarMenu from "./Sidebar";
import Header from "./Header";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <div className="wrapper">
        <Outlet />
        </div>
      </Container>
      <SidebarMenu />
    </>
  );
};
export default Layout;

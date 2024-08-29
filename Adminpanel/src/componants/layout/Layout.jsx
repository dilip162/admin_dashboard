import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
      <Sidebar />
    </>
  );
};
export default Layout;

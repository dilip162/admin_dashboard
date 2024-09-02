import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componants/Login";
import Layout from "./componants/layout/Layout";
import Dashboard from "./componants/dashboard/Dashboard";
import EditProfile from "./componants/profile/EditProfile";
import ViewProfile from "./componants/profile/ViewProfile";
import Users from "./UserManagment/Users";
import AddNewUser from "./UserManagment/AddNewUser";
import EditUser from "./UserManagment/EditUser";
import Pages from "./Page Managment/Pages";
import AddNewPage from "./Page Managment/AddNewPage";
import EditPage from "./Page Managment/EditPage";


// import RequireAuth from "./componants/dashboard/RequireAuth";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/admin" element={<Layout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route
              path="/admin/edituser/:id"
              element={
                <EditProfile />
              }
            />
            <Route
              path="/admin/viewuser/:id"
              element={
                <ViewProfile/>
              }
            />
           <Route
            path="/admin/users" 
            element={
          <Users />
          } />
          <Route 
          path="/admin/addnewuser" 
          element={
          <AddNewUser />
          } />
          <Route
            path="/admin/pages" 
            element={
          <Pages />
          } />
          <Route 
          path="/admin/addnewpage" 
          element={
          <AddNewPage />
          } />
          <Route 
          path="/admin/editpage/:id" 
          element={
          <EditPage />
          } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

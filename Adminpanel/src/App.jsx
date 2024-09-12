import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componants/Login";
import Layout from "./componants/layout/Layout";
import Dashboard from "./componants/dashboard/Dashboard";
import EditProfile from "./componants/profile/EditProfile";
import ViewProfile from "./componants/profile/ViewProfile";
import Users from "./UserManagment/Users";
import AddNewUser from "./UserManagment/AddNewUser";
import Pages from "./Page Managment/Pages";
import AddNewPage from "./Page Managment/AddNewPage";
import EditPage from "./Page Managment/EditPage";


// import RequireAuth from "./componants/dashboard/RequireAuth";
import UpdatePage from "./componants/pages/UpdatePage";
import AddPage from "./componants/pages/AddPage";
import ViewPage from "./componants/pages/ViewPage";
import SinglePage from "./componants/pages/SinglePage";
import ManageCategory from "./componants/category/ManageCategory";
import ViewCategory from "./componants/category/ViewCategory";
import UpdateCategory from "./componants/category/UpdateCategory";
import SingleCategory from "./componants/category/SingleCategory";
import Posts from "./PostManagment/Posts";
import AddNewPost from "./PostManagment/AddNewPost";
import EditPost from "./PostManagment/EditPost";

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
          path="/admin/posts" 
          element={
          <Posts />
          } />
          <Route 
          path="/admin/addnewpost" 
          element={
          <AddNewPost />
          } />
          <Route 
          path="/admin/editpost" 
          element={
          <EditPost />
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
          <Route
              path="/admin/pages/add"
              element={
                <AddPage />
              }
            />

            <Route
              path={`/admin/pages/update/:id`}
              element={
                //<RequireAuth>
                <UpdatePage />
              }
            />

            <Route
              path={`/admin/pages/view/:id`}
              element={
                //<RequireAuth>
                <SinglePage />
              }
            />

            <Route path="/admin/pages/view" element={<ViewPage />} />

            {/* -------------  Category Routes ------------- */}

            <Route path="/admin/category/create" element={<ManageCategory />} />
            <Route path="/admin/category/view" element={<ViewCategory />} />
            <Route
              path="/admin/category/update/:id"
              element={<UpdateCategory />}
            />
            <Route
              path="/admin/category/view/:id"
              element={<SingleCategory />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

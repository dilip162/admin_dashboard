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
            <Route path="dashboard" element={<Dashboard />} />
            {/* ------------ user ------------- */}
            <Route path="edituser/:id" element={<EditProfile />} />
            <Route path="viewuser/:id" element={<ViewProfile />} />
            <Route path="users" element={<Users />} />
            <Route path="addnewuser" element={<AddNewUser />} />
            {/* -------------- Pages ------------------------------- */}
            <Route path="pages/view" element={<ViewPage />} />
            <Route path="pages/update/:id" element={<UpdatePage />} />
            <Route path="pages/view/:id" element={<SinglePage />} />
            <Route path="pages/add" element={<AddPage />} />
            {/* --- page Management ----- */}
            <Route path="pages" element={<Pages />} />
            <Route path="addnewpage" element={<AddNewPage />} />
            <Route path="editpage/:id" element={<EditPage />} />

            {/* --------- Category -------------------- */}
            <Route path="category/create" element={<ManageCategory />} />
            <Route path="category/view" element={<ViewCategory />} />
            <Route path="category/update/:id" element={<UpdateCategory />} />
            <Route path="category/view/:id" element={<SingleCategory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

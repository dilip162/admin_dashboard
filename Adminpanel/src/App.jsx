import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componants/Login";
import Layout from "./componants/layout/Layout";
import Dashboard from "./componants/dashboard/Dashboard";
import EditProfile from "./componants/profile/EditProfile";
import UpdatePage from "./componants/pages/UpdatePage";
import AddPage from "./componants/pages/AddPage";
import ViewPage from "./componants/pages/ViewPage";
import SinglePage from "./componants/pages/SinglePage";
import ManageCategory from "./componants/category/ManageCategory";
import ViewCategory from "./componants/category/ViewCategory";
import UpdateCategory from "./componants/category/UpdateCategory";
import SingleCategory from "./componants/category/SingleCategory";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/admin" element={<Layout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route
              path="/admin/user/:id"
              element={
                //<Require>
                <EditProfile />
              }
            />

            {/* ------------------- Pages Routes ------------------- */}

            <Route
              path="/admin/pages/add"
              element={
                //<RequireAuth>
                <AddPage />
                //</RequireAuth>
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

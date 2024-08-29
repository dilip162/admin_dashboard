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
              path="/admin/user/:id"
              element={
                //<RequireAuth>
                <EditProfile />
                //</RequireAuth>
              }
            />

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
                //</RequireAuth>
              }
            />

            <Route
              path={`/admin/pages/view/:id`}
              element={
                //<RequireAuth>
                <SinglePage />
                //</RequireAuth>
              }
            />

            <Route path="/admin/pages/view" element={<ViewPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

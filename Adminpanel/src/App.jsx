import "./App.css";
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componants/Login";
import Layout from "./componants/layout/Layout";
import Dashboard from "./componants/dashboard/Dashboard";
import EditProfile from "./componants/profile/EditProfile";
import RequireAuth from "./componants/dashboard/RequireAuth";


const App = () => {

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route index element={<Login/>} />
      <Route path="/admin" element={<Layout/>} > 
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/admin/user/:id" element={
           //<RequireAuth>
          <EditProfile />
         //</RequireAuth> 
          } />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

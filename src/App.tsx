import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "./admin/Dashboard";
import "./App.css";
import Home from "./pages/Home";

import Form from "./admin/Form";
import AuthForm from "./pages/AuthForm";
import Detail from "./pages/Detail";

function App() {
  return (
    <>
      <header>
        <div className="d-flex ">
          <ul>
            <Link className="fs-5" to="/">
              Home
            </Link>
          </ul>
          <ul className="mx-5">
            <Link className="fs-5" to="admin/login">
              Login
            </Link>
          </ul>
          <ul className="mx-5">
            <Link className="fs-5" to="admin/register">
              Register
            </Link>
          </ul>
          <ul className="mx-5">
            <Link className="fs-5" to="/admin">
              Admin
            </Link>
          </ul>
        </div>
      </header>

      <div className="element">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/admin" element={<Dashboard />}></Route>
          <Route path="/admin/add" element={<Form />}></Route>
          <Route path="/admin/edit/:id" element={<Form />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/admin/register" element={<AuthForm />}></Route>
          <Route path="/admin/login" element={<AuthForm isLogin />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

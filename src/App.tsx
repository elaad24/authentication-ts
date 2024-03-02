import { Route, Routes } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { Button, Container } from "react-bootstrap";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Singin from "./pages/Singin";
import RequireAuth from "./RequireAuth";
function App() {
  return (
    <Container className="my-4">
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/singin" element={<Singin />} />
      </Routes>
    </Container>
  );
}

export default App;

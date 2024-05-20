import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Spline from "@splinetool/react-spline";
import {
  Register,
  Login,
  CreateUrl,
  Home,
  MyLinks,
  DetailsUrl,
  EditUrl,
  Redirect,
} from "./pages";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <div className="background">
          <Spline scene="https://prod.spline.design/s7WwDJJU2zwXIDmw/scene.splinecode" />
        </div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-url" element={<CreateUrl />} />{" "}
          <Route path="/my-links" element={<MyLinks />} />
          <Route path="/urls/:id" element={<DetailsUrl />} />
          <Route path="/urls/:id/edit" element={<EditUrl />} />
          <Route path="/:shortLink" element={<Redirect />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./routers/Admin";
import Home from "./routers/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

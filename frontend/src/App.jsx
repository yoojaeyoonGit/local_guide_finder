import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import PackageEdit from "./PackageEdit";
import PackageEdit2 from "./PackageEdit2";
import PackageEdit3 from "./PackageEdit3";
import Pay from "./Pay";
import Refund from "./Refund";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PackageEdit3 />} />
        <Route path="/package-edit" element={<PackageEdit />} />
        <Route path="/package-edit2" element={<PackageEdit2 />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/refund" element={<Refund />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
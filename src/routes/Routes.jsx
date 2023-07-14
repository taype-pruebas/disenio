import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Tools from "../pages/tools/Tools";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/tools">
            <Route index element={<Tools />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesApp;

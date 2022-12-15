import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AccountBox } from "./components/loginBox";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { HorizontalRule } from "./components/my-styled/common";
import { HealthCheck } from "./components/pages/HealthCheck";
import { DataView } from "./components/pages/DataView";
import { CustomDataView } from "./components/pages/CustomDataView";
import { DefaultHomePage } from "./components/pages/DefauftHomePage";
import PrivateRoutes from "./utils/PrivateRoutes";


function App() {
  return (
    <Router>
      <Header />
      <HorizontalRule />
      <Routes >
        <Route path="/CCS" element={<AccountBox />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/CCS/home" element={<DefaultHomePage />} exact />
          <Route path="/CCS/data-view" element={<DataView />} exact />
          <Route path="/CCS/custom-view" element={<CustomDataView exact />} />
          <Route path="/CCS/health-check" element={<HealthCheck exact />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

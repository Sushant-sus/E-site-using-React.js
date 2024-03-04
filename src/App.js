// import "./App.css";
import LayoutEdit from "./components/Layout/Edit";
import LayoutNew from "./components/Layout/New";
import LayoutItemNew from "./components/LayoutItems/New";
import LayoutItemEdit from "./components/LayoutItems/Edit";
import MainBody from "./components/body/MainBody";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutTable from "./components/Layout/LayoutList";
import LayoutItemList from "./components/LayoutItems/LayoutItemList";
import LayoutItem from "./components/LayoutItems/LayoutItem";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainBody />} />
          <Route path="/layout/item/:layoutId" element={<LayoutItem />} />

          <Route path="/layout" element={<LayoutTable />} />
          <Route
            path="/layout/item/list"
            element={<LayoutItemList />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

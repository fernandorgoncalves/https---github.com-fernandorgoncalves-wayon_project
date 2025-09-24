import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import TransfersPage from "./pages/TransfersPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TransfersPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

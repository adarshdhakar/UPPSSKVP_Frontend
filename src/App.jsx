import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import RegexToDfaConverter from "./pages/RegexToDfaConverter"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegexToDfaConverter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Homepage } from "./pages/Homepage.tsx";

function App() {
  return (
    <>
      <div className="bg-background font-sans antialiased">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

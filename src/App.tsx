import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Todo from "./components/Todo/Todo";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === 'true') {
      return true
    } else {
      return false
    }
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])


  return (
    <div
      className={`h-screen transition-colors ${darkMode ? "dark bg-slate-900" : ""}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex flex-col items-center align-middle">
        <Todo />
      </div>
      <Footer />
    </div>
  );
}

export default App;

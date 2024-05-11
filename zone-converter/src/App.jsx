import { useContext } from "react";
import Header from "./components/Header"
import Home from "./components/Home"
import TimeZoneSlider from "./components/TimeZoneSlider"
import { ThemeContext } from "./components/context";


function App() {
  const {toggle,toggletheme} = useContext(ThemeContext);
  return (
    <>
      <div className={`p-2 h-screen ${toggle ? "bg-black text-white" : "bg-white text-black"}`} >
        <Header/>
        <Home/>
      </div>
    </>
  )
}

export default App

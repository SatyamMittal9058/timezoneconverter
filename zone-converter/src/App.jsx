import { useContext } from "react";
import Header from "./components/Header"
import Home from "./components/Home"
import TimeZoneSlider from "./components/TimeZoneSlider"
import { ThemeContext } from "./components/context";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

const onDragEnd = (result) => {
  const { source, destination } = result;
  if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
    return;
  }

  const newItems = Array.from(items);
  const [reorderedItem] = newItems.splice(source.index, 1);
  newItems.splice(destination.index, 0, reorderedItem);

  setItems(newItems);
};
function App() {
  const toggle = useSelector(state => state.theme.toggle);
  
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

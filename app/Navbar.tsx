import { DroppableArea } from "./DroppableArea"
import DraggableNode from "./DraggableNode"
import { useState, useContext,  } from "react";
import { NodeContext } from "./page";

interface NarbarProps {
    action: any;
}

export default function Navbar() {

    const [nodes, setNodes]: any= useContext(NodeContext);
    const [currId, setCurrId] =  useState(1)
    const addNode = (name: string) => {
      const newNode = {
        name: name,
        id: currId
      };
      setCurrId(currId + 1)
  
      setNodes([...nodes, newNode]);
    };
    let buttonClass: string = "bg-violet-100 h-fit w-2/12 px-8 rounded-lg transition ease-in-out hover:bg-violet-200 duration-500 py-5" 
    return(
        <section className="flex justify-around w-screen p-0 my-3">
        <button className={buttonClass}
        
        onClick={()=>addNode("Linear Layer")}>Linear Layer</button>
        <button className={buttonClass} onClick={()=>addNode("Convolutional Layer")}>Convolutional Layer</button>
        </section>)
}
'use client';
import Navbar from "./Navbar";
import DraggableNode from "./DraggableNode";
import { DroppableArea } from "./DroppableArea";
import { NodeAndArrowContext } from "./NodeArrowContext";
import React, { useState, createContext } from 'react';



export default function Home() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [arrows, setArrows]: any = useState<any[]>([])

  return (
  <section className="w-full">
    <NodeAndArrowContext.Provider value={[nodes, setNodes, arrows, setArrows]}>

    <Navbar/>
    
    <DroppableArea>
    </DroppableArea>
    </NodeAndArrowContext.Provider>
  </section>
);
}
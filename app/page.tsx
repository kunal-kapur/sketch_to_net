'use client';
//@ts-ignore
import Navbar from "./Navbar";
import DraggableNode from "./DraggableNode";
import { DroppableArea } from "./DroppableArea";
import React, { useState, createContext } from 'react';

export const NodeContext: any = createContext(null);

export default function Home() {
  const [nodes, setNodes] = useState<any>([]);

  return (
  <section className="w-full">
    <NodeContext.Provider value={[nodes, setNodes]}>
    <Navbar/>
    
    <DroppableArea nodes={nodes}>
    </DroppableArea>
    </NodeContext.Provider>


  </section>
);
}

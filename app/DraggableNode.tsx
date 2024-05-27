'use client';
import React from 'react';
import Draggable from 'react-draggable';
import { useContext } from 'react';
import { NodeContext } from './page';

interface NodeProps{
  name: string;
  id: number;
}

export default function DraggableNode({name, id}: NodeProps) {
  const [nodes, setNodes]: any= useContext(NodeContext);
  const removeNode = (id: number)=> {
    const newNodes = [];
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id == id) {
        newNodes.push({name: '', id: 0});
      }
      else {
        newNodes.push(nodes[i]);
      }
    }
    console.log(id);
    setNodes(newNodes);
  }
    return (
        <Draggable>
          <div className="fixed flex flex-col bg-green-300 w-52 h-25 text-center pb-5 pl-4 rounded">
            <button onClick={()=>removeNode(id)} text-sm className='self-end right bg-red-300 w-1/12 rounded-full hover:bg-red-500 duration-300'>x</button>
            <div className="text-lg mt-2">
              {name}
            </div>
          </div>
        </Draggable>
      );
}

export function ZombieNode({name, id}: NodeProps) {
  return(<div className="fixed bg-transparent w-52 h-32 text-center pb-5 pl-4 rounded">
<p></p>
<p></p>
  </div>)
}


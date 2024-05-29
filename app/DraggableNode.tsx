'use client';
import React from 'react';
import Draggable from 'react-draggable';
import { useContext } from 'react';
import { NodeContext } from './page';
import Xarrow from 'react-xarrows/lib/Xarrow/Xarrow';
import { useXarrow } from 'react-xarrows';
import { useDrag, useDrop } from 'react-dnd';
import { ArrowContext } from './DroppableArea';

interface NodeProps{
  name: string;
  id: number;
}

interface EntryPoint {
  name: string;
}


const attachString: string = 'w-5 h-5 bg-orange-200 transition ease-in-out hover:bg-orange-300 duration-300';

function entryFunction(id: number) {
  
}


export default function DraggableNode({name, id}: NodeProps) {
  const [nodes, setNodes]: any= useContext(NodeContext);
  const [arrows, setArrows]: any = useContext(ArrowContext);

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
  const [collected, dragSource, dragPreview]: any = useDrag(() => ({
      type: "entry",
      item: {drag_id:id},
    }))

    const [collectedProps, dropRef]: any = useDrop(() => ({
      accept: "entry",
      drop: (item: any)=>setArrows([...arrows, [item.drag_id, id]])
    }))
  const updateXarrow = useXarrow();

  // TODO add dropREF
  return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
          <div className="fixed flex flex-col bg-green-300 w-52 h-25 text-center pb-5 rounded">
            <button onClick={()=>removeNode(id)} text-sm className='self-end right bg-red-300 w-1/12 rounded-full hover:bg-red-500 duration-300'>x</button>
            <div 
            className="flex justify-between text-lg">
              <div ref={dropRef} className={attachString}></div>
              <div>{name}</div>
              <div ref={dragSource} className={attachString}></div>
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


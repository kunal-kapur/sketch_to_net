'use client';
import React from 'react';
import Draggable from 'react-draggable';
import { useContext } from 'react';
import { NodeAndArrowContext } from './page';
import { useXarrow } from 'react-xarrows';
import { useDrag, useDrop } from 'react-dnd';
import { render, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { useRef } from 'react';

interface NodeProps{
  name: string;
  id: string;
}



const attachString: string = 'w-8 h-8 rounded-full bg-yellow-100 transition ease-in-out hover:bg-yellow-300 duration-300';


function InputLayer() {
  return (
    <div className='flex flex-col items-center'>
      <div>{"Input Layer"}</div>
      <input className='text-center w-8/12 rounded' type='number' min={1}></input>
    </div>    
  )
}

function LinearNode() {
  return (
    <div className='flex flex-col items-center'>
      <div>{"Linear Layer"}</div>
      <input className='text-center w-8/12 rounded' type='number' min={1}></input>
    </div>    
  )
}


function ConvolutionalNode() {
  return (
    <div className='flex flex-col items-center'>
      <div>{"Convolutional Layer"}</div>
      <input className='text-center w-8/12' type='number'></input>
    </div>    
  )
}


function ActivationFunction() {
  const [selectedItem, setSelectedItem] = useState('');

  const handleChange = (event: any) => {
    setSelectedItem(event.target.value);
  };

  

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 pt-2">
        <select
          className="text-center px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          defaultValue=""
        >
          <option className="text-xl" value="" disabled>Activation Function</option>
          <option value="ReLU">ReLU</option>
          <option value="Sigmoid">Sigmoid</option>
          <option value="Tahn">Tahn</option>
        </select>
      </div>
    </div>
  )

}

function LossFunction() {
  const [selectedItem, setSelectedItem] = useState('');

  const handleChange = (event: any) => {
    setSelectedItem(event.target.value);
  };
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 pt-2">
        <select
          className="text-center px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          defaultValue=""
        >
          <option className="text-xl" value="" disabled>Loss</option>
          <option value="Cross-Entropy">Cross-Entropy</option>
          <option value="Softmax">Softmax</option>
          <option value="NLL">NLL</option>
        </select>
      </div>
    </div>
  )

}

function decipherNode(name: string) {
  if (name == "Linear Layer") {
    return LinearNode();
  }
  if (name == "Convolutional Layer") {
    return ConvolutionalNode();
  }
  if (name == "Activation Function") {
    return ActivationFunction();
  }
  if (name == "Loss Function") {
    return LossFunction();
  }
  if (name == "Input Layer") {
    return InputLayer();
  }
}

export default function DraggableNode({name, id}: NodeProps) {
  let [nodes, setNodes, arrows, setArrows]: any = useContext(NodeAndArrowContext)
  const elementRef = useRef(null);



  const removeNode = (id: string)=> {
    const newNodes = [];
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id == id) {
        newNodes.push({name: '', id: '0'});
      }
      else {
        newNodes.push(nodes[i]);
      }
    }
    setNodes(newNodes);
    const newArrows: [] = []
    arrows.forEach((pair: [])=>{
      if (!pair.includes(id)) {
        newArrows.push(pair)
      }
      setArrows(newArrows)
    })
  }
  
  const [collected, dragSource, dragPreview]: any = useDrag(() => ({
      type: "entry",
      item: {drag_id:id},
    }))
    const [collectedProps, dropRef]: any = useDrop(() => ({
      accept: "entry",
      drop: (item: any)=>setArrows((arrows: any) => {
        if (arrows.some((arrow: any) => arrow[0] === item.drag_id && arrow[1] === id) || (item.drag_id == id)) {
          return arrows
        }
        return [...arrows, [item.drag_id, id]]
      }
    )
    }
  ))
  const updateXarrow = useXarrow();

  const nodeType = decipherNode(name);

  return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
          <div ref={dropRef} id={id} className="fixed flex flex-col bg-green-300 w-fit h-30 text-center pb-10 rounded">
            <button onClick={()=>removeNode(id)} text-sm className='self-end right bg-red-300 w-1/12 rounded-full hover:bg-red-500 duration-300'>x</button>
            <div 
            className="flex justify-between">
              <div draggable={false} className={attachString}></div>
              {nodeType}
              <div draggable={false} ref={dragSource} className={attachString} ></div>
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


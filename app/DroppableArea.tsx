'use client';
import DraggableNode from './DraggableNode';
import { ZombieNode } from './DraggableNode';
import { useContext, useState } from 'react';
import { NodeAndArrowContext } from './NodeArrowContext';
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createContext } from 'react';
import { NodeProps } from 'postcss';


export const ArrowContext: any = createContext(null);

export function DroppableArea() {
    let x: any = NodeAndArrowContext
    let [nodes, setNodes, arrows, setArrows]: [NodeProps[], any, [string, string][], any] = useContext(x)

    let arr = nodes.map((x:any)=>{
        if (x.id == 0) {
            return (<ZombieNode key={x.id} name={''} id={"0"} nodeAttributes={{}}/>)
        }
        return (<DraggableNode key={"node"+x.id} name={x.name} id={x.id.toString()} nodeAttributes={{}}/>
    )})

    const createArrowArr=()=>{
        const val = arrows.map((x: any)=>{
        return <Xarrow key={"arrow-(" + x[0] + "," + x[1] + ")"} start={x[0]} end={x[1]}></Xarrow>;
        })
        return val;

    }
    return(
        <DndProvider backend={HTML5Backend}>
            <Xwrapper>
                    <section className='w-fit'>
                        <span>
                            {arr}
                            {createArrowArr()}
                        </span>
                    </section>
            </Xwrapper>
        </DndProvider>
    )
}
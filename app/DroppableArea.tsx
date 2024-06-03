'use client';
import DraggableNode from './DraggableNode';
import { ZombieNode } from './DraggableNode';
import { useContext, useState } from 'react';
import { NodeAndArrowContext } from './page';
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createContext } from 'react';


export const ArrowContext: any = createContext(null);

export function DroppableArea() {
    let [nodes, setNodes, arrows, setArrows]: any = useContext(NodeAndArrowContext)

    let arr = nodes.map((x:any)=>{
        if (x.id == 0) {
            return (<ZombieNode name={''} id={"0"}/>)
        }
        return (<DraggableNode name={x.name} id={x.id.toString()}/>
    )})

    const createArrowArr=()=>{
        console.log(arrows)
        const val = arrows.map((x: any)=>{
        return <Xarrow start={x[1]} end={x[0]}></Xarrow>;
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
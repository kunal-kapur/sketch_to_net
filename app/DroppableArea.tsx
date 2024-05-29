'use client';
import DraggableNode from './DraggableNode';
import { ZombieNode } from './DraggableNode';
import { useContext, useState } from 'react';
import { NodeContext } from './page';
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createContext } from 'react';


export const ArrowContext: any = createContext(null);

export function DroppableArea() {

    const [arrows, setArrows]: any = useState([])

    const [nodes, setNodes]: any= useContext(NodeContext);
    let arr = nodes.map((x:any)=>{
        if (x.id == 0) {
            return (<ZombieNode name={''} id={0}/>)
        }
        return (<DraggableNode name={x.name} id={x.id.toString()}/>
    )})

    let arrowArr = arrows.map((x: any)=>{

        <Xarrow start={x[0]} end={x[1]}></Xarrow>
    })
    console.log(arrowArr)
    return(
        <DndProvider backend={HTML5Backend}>
            <Xwrapper>
                <ArrowContext.Provider value={[arrows, setArrows]}>
                    <section className='w-fit'>
                        <span>
                            {arr}
                            {arrowArr}
                        </span>
                    </section>
                </ArrowContext.Provider>
            </Xwrapper>
        </DndProvider>
    )
}
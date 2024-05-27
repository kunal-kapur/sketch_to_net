'use client';
import DraggableNode from './DraggableNode';
import { ZombieNode } from './DraggableNode';
import { useContext } from 'react';
import { NodeContext } from './page';

interface DroppableAreaProps{
    nodes: any;
}

export function DroppableArea() {
    const [nodes, setNodes]: any= useContext(NodeContext);
    let arr = nodes.map((x:any)=>{
        if (x.id == 0) {
            return (<ZombieNode name={''} id={0}/>)
        }
        return (<DraggableNode name={x.name} id={x.id}/>
    )})
    return(
        <section className='w-fit'>
            <span>
                {arr}
            </span>
            
        </section>
    )
}
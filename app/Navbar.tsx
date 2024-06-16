import DraggableNode, { NodeProps } from "./DraggableNode"
import { useState, useContext,  } from "react";
import { NodeAndArrowContext } from "./page";
import { useRouter } from 'next/navigation';
// import { redirect } from 'next/redirect';

function cleanNodes(nodes: NodeProps[]) {

  const newNodes: NodeProps[] = []
  nodes.forEach(node => {
    if (node.id != '0') {
      newNodes.push(node)
    }
  });
  return newNodes;

}


export default function Navbar() {

  let [nodes, setNodes, arrows, setArrows]: any = useContext(NodeAndArrowContext)
  const router = useRouter();

    const sendDrawing = async() => {
    console.log(nodes)
    const response = await fetch("http://127.0.0.1:5328/submission", {
    method: "POST",
    headers: {
    'Content-Type' : 'application/json'
    },
    body: JSON.stringify({"nodes": cleanNodes(nodes), "arrows": arrows})
    })
  
    // TODO error checking 
    if (response.ok){
    console.log("it worked")
    }
    const data = await response.json();
    // console.log(encodeURI(data['output']));
    // console.log(decodeURI(encodeURI(data['output'])))
    let outString = data['output']
    console.log(outString)
    // outString = outString.replace(/\n/g, '<newline>');
    // const encodedString = btoa(data['output'])
    const encodedString = encodeURIComponent(outString)
    console.log(encodedString)
    // console.log("DECODED", atob(encodedString))
    router.push(`/results/${encodedString}`);
    // redirect("/results", {query: {name: 'Jeff'}})
  }



    // const [nodes, setNodes]: any= useContext(NodeAndArrowContext);
    const [currId, setCurrId] =  useState(1)
    const addNode = (name: string) => {
      const newNode = {
        name: name,
        id: currId.toString(),
        nodeAttributes: {}
      };
      setCurrId(currId + 1)
  
      setNodes([...nodes, newNode]);
    };
    const buttonClass: string = "bg-violet-100 h-fit w-2/12 px-8 rounded-lg transition ease-in-out hover:bg-violet-200 duration-500 py-5" 
    return(
      <section className="flex flex-col items-center justify-center">
          <section className="flex justify-around w-screen p-0 my-3">
          <button className={buttonClass}
            onClick={()=>addNode("Input Layer")}>Input Layer
          </button>
          <button className={buttonClass}
            onClick={()=>addNode("Linear Layer")}>Linear Layer
          </button>
          <button className={buttonClass} onClick={()=>addNode("Convolutional Layer")}>
              Convolutional Layer
          </button>
          <button className={buttonClass} onClick={()=>addNode("Activation Function")}>
              Acitvation Function
          </button>
          <button className={buttonClass} onClick={()=>addNode("Loss Function")}>
              Loss Function
          </button>
          </section>
        <button onClick={sendDrawing} className={"bg-indigo-200 h-fit w-2/12 px-8 rounded-lg hover:bg-indigo-400 transition ease-in-out duration-3000 py-5 self-center my-3"}>
          Submit</button>
      </section >
        )
}
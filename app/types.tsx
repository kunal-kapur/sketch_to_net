import { NodeProps } from "./DraggableNode";


interface NodeAndArrowContextType {
    nodes: NodeProps[];
    setNodes: React.Dispatch<React.SetStateAction<NodeProps[]>>;
    arrows: [string, string][];
    setArrows: React.Dispatch<React.SetStateAction<[string, string][]>>;
  }
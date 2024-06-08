from typing import List, Dict, Any

class Node():

    def __init__(self, name: str, id: int, attrs: dict):
        self.name = name
        self.id = id
        self.neighbors = []
        self.attributes = {}

class Graph: 

    def __init__(self, nodes, arrows):
        self.mapping = {}
        self.nodes = self.__extract_nodes(nodes, arrows=arrows)
        self.size = len(nodes)

    def __extract_nodes(self, nodes, arrows):
        new_node_list: List[Node] = []
        for node_attrs in nodes:

            name = node_attrs.get('name', '')

            id = int(node_attrs.get('id', 0))
            attrs = node_attrs.get('nodeAttributes', {})
            created_node = Node(name=name, id=id, attrs=attrs)
            new_node_list.append(created_node)
            self.mapping[id] = created_node
        for origin, dest in arrows:
            self.mapping[int(origin)].neighbors.append(self.mapping[int(dest)])
        return new_node_list

    def topological_sort(self):
        visited = set()
        stack = []

        def dfs(node):
            if node in visited:
                return
            visited.add(node)
            for neighbor in node.neighbors:
                if neighbor not in visited:
                    dfs(neighbor)
            stack.append(node)

        for node in self.nodes:
            if node not in visited:
                dfs(node)

        stack.reverse()
        return stack

        
        

        

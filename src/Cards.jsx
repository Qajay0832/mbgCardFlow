import { useEffect, useState } from "react";
import Card from "./Card";

const Cards = ({ data }) => {
  console.log("data:", data);
  //   const nodeId = data.id;
  //   const newData = ;
  const [item, setItem] = useState([]);
  const [newEdges, setNewEdges] = useState([]);
  const [chatFlow,setChatFlow]=useState([])
  const addItem = (item, nodeId) => {
    setItem((prev) => [...prev, item]);
    // setNewCard()
    console.log("Item to add:", item, nodeId);
    let belongingEdge =[];
     data.data.edges.filter((edge) => {
      if (edge.source === nodeId) return belongingEdge.push(parseInt(edge.target));
    });
    belongingEdge =
      belongingEdge.length > 0 ? Array.from(new Set(belongingEdge)) : [];
    setNewEdges(belongingEdge);
    nodeId = parseInt(nodeId);
    console.log("New Edges:",nodeId);
    setChatFlow((prev)=>[...prev,{item:item,belongingEdge:[nodeId]}])
    console.log("Belonging Edge:", belongingEdge);
    
    // Here you can dispatch an action or call a function to add the item
    // For example:
    // dispatch(addItem(item));
  };
  useEffect(()=>{
    if (chatFlow.length === 0 && data?.data?.nodes?.length > 0) {
    const firstNodeId = parseInt(data.data.nodes[0].id);
    setChatFlow([{ item: [], belongingEdge: [firstNodeId] }]);
  }
  },[data])

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        {chatFlow.length > 0 &&
          data.data.nodes
            .filter((node) => chatFlow.some(flow=>flow.belongingEdge.includes(parseInt(node.id))))
            .map((node) => (
              <>
              { console.log("chatFlow:",chatFlow,node.id)}
                <Card  item={item} addItem={addItem} node={node} />
              </>
            ))
           }
        {newEdges.length > 0 &&
          data.data.nodes
            .filter((node) => newEdges.includes(parseInt(node.id)))
            .map((node) => (
              <>
                <Card  item={item} addItem={addItem} node={node} />
              </>
            ))}

        <div className="flex flex-col items-center justify-center h-full text-center px-4"></div>
      </div>
    </div>
  );
};

export default Cards;

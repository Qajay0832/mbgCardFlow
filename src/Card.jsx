import { useState } from "react";

const Card = ({ data }) => {
  console.log("data:", data);
  //   const nodeId = data.id;
  //   const newData = ;
  const [item, setItem] = useState([]);
  const [newEdges, setNewEdges] = useState([]);
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
    console.log("Belonging Edge:", belongingEdge);
    
    // Here you can dispatch an action or call a function to add the item
    // For example:
    // dispatch(addItem(item));
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          {data.data.nodes[0].data.name}
        </h2>
        {data.data.nodes[0].data.extraContent &&
          data.data.nodes[0].data.extraContent.map((c, i) => (
            <div
              key={i}
              style={{
                background: "#f0f0f0",
                padding: 5,
                borderRadius: 4,
                marginBottom: 4,
              }}
            >
              <div>{c.content}</div>
              {c.button && (
                <button
                  style={{
                    background: "#1976d2",
                    color: "#fff",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "4px",
                    marginTop: 4,
                    cursor: "pointer",
                  }}
                  onClick={() => addItem(c.content, data.data.nodes[0].id)}
                >
                  {c.button}
                </button>
              )}
            </div>
          ))}
        {item.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Added Items:</h3>
            <ul className="list-disc list-inside">
              {item.map((i, index) => (
                <li key={index} className="text-gray-700">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        )}
        {newEdges.length > 0 &&
          data.data.nodes
            .filter((node) => newEdges.includes(parseInt(node.id)))
            .map((node) => (
              <>
                <h2 className="text-2xl font-bold text-blue-800 mb-2">
                  {node.data.name}
                </h2>
                {node.data.extraContent &&
                  node.data.extraContent.map((c, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#f0f0f0",
                        padding: 5,
                        borderRadius: 4,
                        marginBottom: 4,
                      }}
                    >
                      <div>{c.content}</div>
                      {c.button && (
                        <button
                          style={{
                            background: "#1976d2",
                            color: "#fff",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "4px",
                            marginTop: 4,
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            addItem(c.content, data.data.nodes[0].id)
                          }
                        >
                          {c.button}
                        </button>
                      )}
                    </div>
                  ))}
                
              </>
            ))}

        <div className="flex flex-col items-center justify-center h-full text-center px-4"></div>
      </div>
    </div>
  );
};

export default Card;

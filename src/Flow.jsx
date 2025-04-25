import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./redux/DataSlice";
import ReactFlow, {
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
  Handle,
} from "reactflow";
import "reactflow/dist/style.css";
import { useReactFlow } from "reactflow";
import "./App.css";
import { Link } from "react-router-dom";

const CustomProductNode = ({ data }) => {
  return (
    <div className="custom-node">
      <Handle type="source" position="right" style={{ background: "#555" }} />
      <h4>{data.name}</h4>
      {data.extraContent.map((c, i) => (
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
            >
              {c.button}
            </button>
          )}
        </div>
      ))}

      <Handle type="target" position="left" style={{ background: "#555" }} />
    </div>
  );
};

const nodeTypes = {
  customProduct: CustomProductNode,
};

const initialNode = {
  id: "1",
  type: "customProduct",
  data: {
    name: "Send Message",
    extraContent: [],
  },
  position: { x: 250, y: 100 },
};

export default function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([initialNode]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);
  const [btnNumber, setBtnNumber] = useState(0);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.custom.items);
  console.log("Items from Redux:", items);

  const handleAdd = () => {
    dispatch(
      addItem({
        name: `Node ${items.length + 1}`,
        data: { nodes: nodes, edges: edges },
      })
    );
  };

  const onConnect = (params) => {
    // New node to create when an edge is drawn
    const newNode = {
      id: `${nodes.length + 1}`,
      type: "customProduct",
      data: {
        name: `Send Message`,
        extraContent: [],
      },
      position: { x: params.targetHandle.x + 150, y: params.targetHandle.y }, // Position of the new node based on the target handle of the edge
    };

    // Create new node and edge
    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => addEdge({ ...params, animated: true }, eds));
  };

  const onNodeClick = useCallback((e, node) => {
    setSelectedNode(node); // Set the selected node for content addition
  }, []);
  const handleAddButton = () => {
    if (!selectedNode) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          const contents = [...(node.data.extraContent || [])];

          const last = contents[contents.length - 1];
          if (!last.content) {
            alert("Last item is not content. Cannot attach button.");
            return node;
          }

          const updatedLast = { ...last, button: `Button ${btnNumber}` };
          contents[contents.length - 1] = updatedLast;

          return {
            ...node,
            data: {
              ...node.data,
              extraContent: contents,
            },
          };
        }
        return node;
      })
    );

    setInputValue("");
    setBtnNumber((prev) => prev + 1);
  };

  const handleAddContent = () => {
    if (!inputValue.trim() || !selectedNode) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          const updatedData = {
            ...node.data,
            extraContent: [
              ...(node.data.extraContent || []),
              { content: inputValue }, // 👈 push as object
            ],
          };
          return { ...node, data: updatedData };
        }
        return node;
      })
    );

    setInputValue("");
  };

  const [connectingNode, setConnectingNode] = useState(null);

  const onConnectStart = (_, { nodeId }) => {
    setConnectingNode(nodeId); // store source node ID
  };
  //   const onConnectEnd = (event) => {
  //     if (!connectingNode) return;

  //     const reactFlowBounds = event.target.getBoundingClientRect();
  //     const position = {
  //       x: event.clientX - reactFlowBounds.left,
  //       y: event.clientY - reactFlowBounds.top,
  //     };

  //     const newNode = {
  //       id: `${nodes.length + 1}`,
  //       type: "customProduct",
  //       position,
  //       data: {
  //         name: `Product ${nodes.length + 1}`,
  //         price: "$49.99",
  //         image: "https://via.placeholder.com/150",
  //         extraContent: [],
  //       },
  //     };

  //     setNodes((nds) => [...nds, newNode]);
  //     setEdges((eds) =>
  //       addEdge(
  //         { source: connectingNode, target: newNode.id, animated: true },
  //         eds
  //       )
  //     );
  //     setConnectingNode(null);
  //   };

  const onConnectEnd = (event) => {
    if (!connectingNode || !event.clientX || !event.clientY) return;

    const canvasPosition = project({ x: event.clientX, y: event.clientY });

    const newNode = {
      id: `${nodes.length + 1}`,
      type: "customProduct",
      position: canvasPosition, // 👈 accurate position
      data: {
        name: `Send Message`,
        price: "$29.99",
        extraContent: [],
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) =>
      addEdge(
        { source: connectingNode, target: newNode.id, animated: true },
        eds
      )
    );
    setConnectingNode(null);
  };

  const { project } = useReactFlow();
  useEffect(() => {
    console.log("Updated Nodes:", nodes);
    console.log("Updated Edges:", edges);
  }, [nodes, edges]);

  return (
    <div
      className="reactflow-wrapper"
      style={{ display: "flex", width: "100%", height: "100vh" }}
    >
      <div className="navbar">
        <button
          className="sidebarButton"
          style={{ background: "#1976d2", marginTop: 8 }}
          onClick={handleAdd}
        >
          Add Your Flow
        </button>
        <Link
          to={"/flow"}
          className="sidebarButton"
          style={{ background: "#1976d2", marginTop: 8 }}
        >
          View Flows
        </Link>
      </div>
      {selectedNode && (
        <div className="sidebar">
          <h3>Details</h3>
          <h4>{selectedNode.data.name}</h4>
          <p>{selectedNode.data.price}</p>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add content..."
            className="sidebarInput"
          />
          <button
            onClick={handleAddContent}
            style={{ background: "#1976d2", marginTop: 8 }}
            className="sidebarButton"
          >
            Add to Node
          </button>
          <button
            onClick={() => handleAddButton(inputValue)}
            className="sidebarButton"
            style={{ background: "#1976d2", marginTop: 8 }}
          >
            Add a button
          </button>
        </div>
      )}

      <div style={{ flexGrow: 1 }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            nodeTypes={nodeTypes}
            fitView
            onNodeClick={onNodeClick}
          >
            <MiniMap />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}

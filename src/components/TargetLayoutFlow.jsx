"use client";

import ELK from "elkjs/lib/elk.bundled.js";
import React, { useCallback } from "react";
import {
  ReactFlow,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
// import { initialEdges, initialNodes } from "@/nodes-edges/source-nodes-edges";
import CustomEdge from "./CustomEdge";
import TargetErdTableNode from "./TargetErdTableNode";

const tablesData = [
  {
    tableName: "users",
    conflict: "match",
    columns: [
      {
        name: "user_id",
        type: "integer",
        attributes: {
          isPrimaryKey: true,
          handleId: "pk-user-id", // Handle ID for primary key
          isConnectable: true,
        },
      },
      { name: "username", type: "string", attributes: { isPrimaryKey: false } },
      { name: "email", type: "string", attributes: { isPrimaryKey: false } },
      { name: "password", type: "string", attributes: { isPrimaryKey: false } },
      {
        name: "created_at",
        type: "timestamp",
        attributes: { isPrimaryKey: false },
      },
    ],
  },
  {
    tableName: "orders",
    conflict: "different",
    columns: [
      {
        name: "order_id",
        type: "integer",
        attributes: {
          isPrimaryKey: true,
          handleId: "pk-order-id", // Handle ID for primary key
          isConnectable: true,
        },
      },
      {
        name: "user_id",
        type: "integer",
        attributes: {
          isForeignKey: true,
          handleId: "fk-user-id", // Handle ID for foreign key
          isConnectable: true,
        },
      },
      {
        name: "product_name",
        type: "string",
        attributes: { isPrimaryKey: false },
      },
      {
        name: "quantity",
        type: "integer",
        attributes: { isPrimaryKey: false },
      },
      {
        name: "order_date",
        type: "timestamp",
        attributes: { isPrimaryKey: false },
      },
    ],
  },
  {
    tableName: "payments",
    conflict: "missing",
    columns: [
      {
        name: "missing",
        type: "string",
        attributes: {
          isForeignKey: true,
          handleId: "fk-missing-id-payment", // Handle ID for foreign key to users
          isConnectable: true,
        },
      },
    ],
  },
];

const elk = new ELK();

const nodeTypes = { targetErdTableNode: TargetErdTableNode };

const edgeTypes = {
  "custom-edge": CustomEdge,
};

const initialEdges = [
  {
    id: "edge-1",
    source: "node-1",
    target: "node-2",
    sourceHandle: "pk-user-id",
    targetHandle: "fk-user-id",
    type: "custom-edge",
    animated: true,
  },
  {
    id: "edge-2",
    source: "node-1",
    target: "node-3",
    sourceHandle: "pk-user-id",
    targetHandle: "fk-missing-id-payment",
    type: "custom-edge",
    animated: true,
  },
  {
    id: "edge-3",
    source: "node-2",
    target: "node-3",
    sourceHandle: "pk-order-id",
    targetHandle: "fk-missing-id-payment",
    type: "custom-edge",
    animated: true,
  },
];

const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const defaultOptions = {
    "elk.algorithm": "layered",
    "elk.layered.spacing.nodeNodeBetweenLayers": 100,
    "elk.spacing.nodeNode": 80,
  };

  const getLayoutedElements = useCallback((options) => {
    const layoutOptions = { ...defaultOptions, ...options };
    const graph = {
      id: "root",
      layoutOptions: layoutOptions,
      children: getNodes().map((node) => ({
        ...node,
        width: node.measured.width,
        height: node.measured.height,
      })),
      edges: getEdges(),
    };

    elk.layout(graph).then(({ children }) => {
      // By mutating the children in-place we saves ourselves from creating a
      // needless copy of the nodes array.
      children.forEach((node) => {
        node.position = { x: node.x, y: node.y };
      });

      setNodes(children);
      window.requestAnimationFrame(() => {
        fitView();
      });
    });
  }, []);

  return { getLayoutedElements };
};

const TargetLayoutFlow = () => {
  const initialNodes = tablesData.map((table, index) => ({
    id: `node-${index + 1}`,
    type: "targetErdTableNode",
    position: { x: index * 300, y: index * 100 },
    data: table,
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { getLayoutedElements } = useLayoutedElements();

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: "custom-edge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onConnect={onConnect}
      fitView
    >
      <Panel position="top-right">
        <button
          onClick={() =>
            getLayoutedElements({
              "elk.algorithm": "layered",
              "elk.direction": "DOWN",
            })
          }
        >
          vertical layout
        </button>
        <button
          onClick={() =>
            getLayoutedElements({
              "elk.algorithm": "layered",
              "elk.direction": "RIGHT",
            })
          }
        >
          horizontal layout
        </button>
        <button
          onClick={() =>
            getLayoutedElements({
              "elk.algorithm": "org.eclipse.elk.radial",
            })
          }
        >
          radial layout
        </button>
        <button
          onClick={() =>
            getLayoutedElements({
              "elk.algorithm": "org.eclipse.elk.force",
            })
          }
        >
          force layout
        </button>
      </Panel>
    </ReactFlow>
  );
};

export default TargetLayoutFlow;

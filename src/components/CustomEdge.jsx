"use client";

import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  Position,
} from "@xyflow/react";

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
  // Use the props to define the source and target positions
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX, // Source X from props
    sourceY, // Source Y from props
    sourcePosition: Position.Right, // Assuming the source position is always Right
    targetX, // Target X from props
    targetY, // Target Y from props
    targetPosition: Position.Left, // Assuming the target position is always Left
    borderRadius: 8,
  });

  // Return the edge with the correct path
  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: "#EBEBEB", strokeWidth: 2 }}
      />
      <EdgeLabelRenderer>
        <span
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="bg-white"
        >
          One to Many
        </span>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;

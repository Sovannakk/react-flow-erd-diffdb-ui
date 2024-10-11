"use client";

import { Handle, Position } from "@xyflow/react";
import React from "react";

const SourceErdTableNode = ({ data, isConnectable }) => {
  return (
    <div className="w-[300px] h-auto border-2 rounded-lg flex flex-col">
      <div
        className={`text-center p-3 border-b-2 ${
          data.conflict === "match"
            ? "bg-[#ECFFED]"
            : data.conflict === "different"
            ? "bg-[#FDF6E6]"
            : "bg-[#FFF1F1]"
        } rounded-t-lg`}
      >
        {data.tableName}
      </div>
      {data.columns.map((column, i) => (
        <div
          className={`${i !== data.columns.length - 1 ? "border-b-2" : ""}`}
          key={i}
        >
          <div className="flex">
            <div className="border-r-2 p-3 flex justify-center items-center">
              {column.attributes.isPrimaryKey ? (
                <div>
                  <Handle
                    type="source"
                    position={Position.Right}
                    id={column.attributes.handleId}
                    isConnectable={isConnectable}
                    style={{
                      top: "25%",
                      transform: "translateY(-50%)",
                      right: -5,
                      backgroundColor: "green", // Source handle style
                      width: "10px", // Adjust handle size
                      height: "10px",
                    }} // Centered handle
                  />
                  <svg
                    width="20"
                    height="12"
                    viewBox="0 0 22 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.65 4C10.83 1.67 8.61 0 6 0C2.69 0 0 2.69 0 6C0 9.31 2.69 12 6 12C8.61 12 10.83 10.33 11.65 8H16V12H20V8H22V4H11.65ZM6 8C4.9 8 4 7.1 4 6C4 4.9 4.9 4 6 4C7.1 4 8 4.9 8 6C8 7.1 7.1 8 6 8Z"
                      fill="#F7C144"
                    />
                  </svg>
                </div>
              ) : column.attributes.isForeignKey ? (
                <div>
                  <Handle
                    type="target"
                    position={Position.Left}
                    id={column.attributes.handleId}
                    isConnectable={isConnectable}
                    style={{
                      top: `${((i + 1) / data.columns.length) * 100}%`, // Dynamically position for multiple foreign keys
                      transform: "translateY(-50%)",
                      left: -5,
                      backgroundColor: "blue", // Target handle style
                      width: "10px", // Adjust handle size
                      height: "10px",
                    }}
                  />
                  <svg
                    width="20"
                    height="12"
                    viewBox="0 0 22 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.65 4C10.83 1.67 8.61 0 6 0C2.69 0 0 2.69 0 6C0 9.31 2.69 12 6 12C8.61 12 10.83 10.33 11.65 8H16V12H20V8H22V4H11.65ZM6 8C4.9 8 4 7.1 4 6C4 4.9 4.9 4 6 4C7.1 4 8 4.9 8 6C8 7.1 7.1 8 6 8Z"
                      fill="#215F9A"
                    />
                  </svg>
                </div>
              ) : (
                <span className="text-white">PK</span>
              )}
            </div>
            <div className="w-full p-3">{column.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SourceErdTableNode;

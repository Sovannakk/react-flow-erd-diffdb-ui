import SourceLayoutFlow from "@/components/SourceLayoutFlow";
import TargetLayoutFlow from "@/components/TargetLayoutFlow";
import { ReactFlowProvider } from "@xyflow/react";

export default function Home() {
  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      {/* Source Section */}
      <div style={{ flex: 1, padding: "10px", borderRight: "2px solid #ddd" }}>
        <h2>Source</h2>
        <ReactFlowProvider>
          <SourceLayoutFlow />
        </ReactFlowProvider>
      </div>

      {/* Target Section */}
      <div style={{ flex: 1, padding: "10px" }}>
        <h2>Target</h2>
        <ReactFlowProvider>
          <TargetLayoutFlow />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

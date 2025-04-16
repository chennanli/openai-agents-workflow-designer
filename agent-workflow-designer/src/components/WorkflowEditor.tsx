import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  ReactFlowInstance,
  Node,
  Connection,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';

import { nodeTypes } from './nodes';
import { SidebarPanel, PropertiesPanel } from './panels';
import { useWorkflow } from '../context/WorkflowContext';
import { NodeType } from '../types';

const WorkflowEditor: React.FC = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    reactFlowInstance,
    setReactFlowInstance,
    addNode,
    setSelectedNode
  } = useWorkflow();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowKey, setReactFlowKey] = useState<number>(0);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow') as NodeType;

      // Check if the dropped element is valid
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      addNode(type, position);
    },
    [reactFlowInstance, addNode]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
      <SidebarPanel />

      <div
        className="reactflow-wrapper"
        ref={reactFlowWrapper}
        style={{ flex: 1, height: '100%' }}
      >
        <ReactFlow
          key={reactFlowKey}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.Bezier}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.type === NodeType.AGENT) return '#3498db';
              if (n.type === NodeType.RUNNER) return '#e74c3c';
              if (n.type === NodeType.FUNCTION_TOOL) return '#f39c12';
              if (n.type === NodeType.GUARDRAIL) return '#9b59b6';
              return '#eee';
            }}
            nodeColor={(n) => {
              if (n.type === NodeType.AGENT) return '#3498db30';
              if (n.type === NodeType.RUNNER) return '#e74c3c30';
              if (n.type === NodeType.FUNCTION_TOOL) return '#f39c1230';
              if (n.type === NodeType.GUARDRAIL) return '#9b59b630';
              return '#fff';
            }}
          />
        </ReactFlow>
      </div>

      <PropertiesPanel />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <WorkflowEditor />
  </ReactFlowProvider>
);
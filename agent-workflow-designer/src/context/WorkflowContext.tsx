import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { 
  ReactFlowInstance, 
  Node, 
  Edge, 
  Connection, 
  addEdge, 
  OnNodesChange, 
  OnEdgesChange, 
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges
} from 'reactflow';
import { 
  NodeType, 
  CustomNode, 
  CustomEdge, 
  ConnectionType,
  AgentNodeData,
  RunnerNodeData,
  FunctionToolNodeData,
  GuardrailNodeData
} from '../types';

interface WorkflowContextProps {
  nodes: CustomNode[];
  edges: CustomEdge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  reactFlowInstance: ReactFlowInstance | null;
  setReactFlowInstance: (instance: ReactFlowInstance) => void;
  addNode: (type: NodeType, position: { x: number; y: number }) => void;
  updateNodeData: (nodeId: string, data: Partial<AgentNodeData | RunnerNodeData | FunctionToolNodeData | GuardrailNodeData>) => void;
  selectedNode: CustomNode | null;
  setSelectedNode: (node: CustomNode | null) => void;
  generateCode: () => string;
}

const WorkflowContext = createContext<WorkflowContextProps | undefined>(undefined);

// Node counter for generating unique IDs
let nodeIdCounter = 1;

// Default node data based on type
const getDefaultNodeData = (type: NodeType) => {
  const baseData = {
    label: type.charAt(0).toUpperCase() + type.slice(1),
    type
  };

  switch (type) {
    case NodeType.AGENT:
      return {
        ...baseData,
        name: `Agent_${nodeIdCounter}`,
        instructions: 'You are a helpful assistant.',
        handoff_description: '',
        output_type: '',
        handoffs: [],
        tools: []
      } as AgentNodeData;
    
    case NodeType.RUNNER:
      return {
        ...baseData,
        input: '',
        isAsync: false,
        context: ''
      } as RunnerNodeData;
    
    case NodeType.FUNCTION_TOOL:
      return {
        ...baseData,
        name: `function_tool_${nodeIdCounter}`,
        parameters: [],
        returnType: 'str',
        implementation: 'def function_name(param1: str) -> str:\n    return "Hello, world!"'
      } as FunctionToolNodeData;
    
    case NodeType.GUARDRAIL:
      return {
        ...baseData,
        name: `Guardrail_${nodeIdCounter}`,
        instructions: 'Check if the input meets the criteria.',
        output_type: 'GuardrailOutput'
      } as GuardrailNodeData;
    
    default:
      // Default to Agent type to satisfy TypeScript
      return {
        ...baseData,
        name: `Unknown_${nodeIdCounter}`,
        instructions: '',
        handoff_description: '',
        output_type: '',
        handoffs: [],
        tools: []
      } as AgentNodeData;
  }
};

interface WorkflowProviderProps {
  children: ReactNode;
}

export const WorkflowProvider: React.FC<WorkflowProviderProps> = ({ children }) => {
  const [nodes, setNodes] = useState<CustomNode[]>([]);
  const [edges, setEdges] = useState<CustomEdge[]>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      // Determine connection type based on source and target nodes
      if (!connection.source || !connection.target) return;
      
      const sourceNode = nodes.find(node => node.id === connection.source);
      const targetNode = nodes.find(node => node.id === connection.target);
      
      if (!sourceNode || !targetNode) return;

      let connectionType: ConnectionType;
      
      if (sourceNode.data.type === NodeType.AGENT && targetNode.data.type === NodeType.AGENT) {
        connectionType = ConnectionType.HANDOFF;
      } else if (sourceNode.data.type === NodeType.FUNCTION_TOOL && targetNode.data.type === NodeType.AGENT) {
        connectionType = ConnectionType.TOOL;
      } else if (sourceNode.data.type === NodeType.AGENT && targetNode.data.type === NodeType.RUNNER) {
        connectionType = ConnectionType.EXECUTION;
      } else {
        // Invalid connection
        return;
      }

      // Only create edge if source and target are valid strings
      const newEdge: CustomEdge = {
        ...connection,
        source: connection.source,
        target: connection.target,
        id: `e${connection.source}-${connection.target}`,
        data: { connectionType }
      };
      
      setEdges((eds) => addEdge(newEdge, eds));

      // Update node data based on connection
      if (connectionType === ConnectionType.HANDOFF) {
        updateNodeData(
          sourceNode.id, 
          { 
            handoffs: [...(sourceNode.data as AgentNodeData).handoffs, targetNode.id] 
          }
        );
      } else if (connectionType === ConnectionType.TOOL) {
        updateNodeData(
          targetNode.id, 
          { 
            tools: [...(targetNode.data as AgentNodeData).tools, sourceNode.id] 
          }
        );
      }
    },
    [nodes]
  );

  const addNode = useCallback((type: NodeType, position: { x: number; y: number }) => {
    const newNode: CustomNode = {
      id: `${type}-${nodeIdCounter}`,
      type,
      position,
      data: getDefaultNodeData(type),
    };

    nodeIdCounter++;
    setNodes((nds) => [...nds, newNode]);
  }, []);

  const updateNodeData = useCallback((nodeId: string, newData: Partial<AgentNodeData | RunnerNodeData | FunctionToolNodeData | GuardrailNodeData>) => {
    setNodes((nds) => 
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...newData
            }
          };
        }
        return node;
      })
    );

    // Update selected node if it's the one being modified
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode((prev) => 
        prev ? {
          ...prev,
          data: {
            ...prev.data,
            ...newData
          }
        } : null
      );
    }
  }, [selectedNode]);

  // Function to generate code based on the workflow
  const generateCode = useCallback(() => {
    // Collect all nodes by type
    const agentNodes = nodes.filter(node => node.data.type === NodeType.AGENT);
    const runnerNodes = nodes.filter(node => node.data.type === NodeType.RUNNER);
    const functionToolNodes = nodes.filter(node => node.data.type === NodeType.FUNCTION_TOOL);
    const guardrailNodes = nodes.filter(node => node.data.type === NodeType.GUARDRAIL);

    // Start building the code
    let code = 'from agents import Agent, Runner';
    
    // Add imports based on node types
    if (functionToolNodes.length > 0) {
      code += ', function_tool';
    }
    
    if (guardrailNodes.length > 0) {
      code += ', InputGuardrail, GuardrailFunctionOutput';
    }
    
    // Check if we need asyncio
    const hasAsyncRunner = runnerNodes.some(node => (node.data as RunnerNodeData).isAsync);
    if (hasAsyncRunner) {
      code += '\nimport asyncio';
    }
    
    // Check if we need pydantic
    const hasOutputType = agentNodes.some(node => (node.data as AgentNodeData).output_type) || 
                          guardrailNodes.length > 0;
    if (hasOutputType) {
      code += '\nfrom pydantic import BaseModel';
    }
    
    code += '\n\n';
    
    // Add Pydantic models if needed
    agentNodes.forEach(node => {
      const data = node.data as AgentNodeData;
      if (data.output_type && data.output_type !== '') {
        code += `class ${data.output_type}(BaseModel):\n`;
        code += '    # Define your model fields here\n';
        code += '    pass\n\n';
      }
    });
    
    // Add function tools
    functionToolNodes.forEach(node => {
      const data = node.data as FunctionToolNodeData;
      code += '@function_tool\n';
      
      // Format parameters
      const params = data.parameters.map(p => `${p.name}: ${p.type}`).join(', ');
      
      code += `def ${data.name}(${params}) -> ${data.returnType}:\n`;
      
      // Add implementation or default
      if (data.implementation && data.implementation.trim() !== '') {
        // Indent each line of the implementation
        const implementation = data.implementation
          .split('\n')
          .map(line => `    ${line}`)
          .join('\n');
        
        code += implementation;
      } else {
        code += `    return "Implementation for ${data.name}"\n`;
      }
      
      code += '\n';
    });
    
    // Add guardrail functions if any
    guardrailNodes.forEach(node => {
      const data = node.data as GuardrailNodeData;
      
      code += `async def ${data.name.toLowerCase()}_guardrail(ctx, agent, input_data):\n`;
      code += `    result = await Runner.run(guardrail_agent, input_data, context=ctx.context)\n`;
      code += `    final_output = result.final_output_as(${data.output_type})\n`;
      code += '    return GuardrailFunctionOutput(\n';
      code += '        output_info=final_output,\n';
      code += '        tripwire_triggered=False,  # Define your condition here\n';
      code += '    )\n\n';
    });
    
    // Define agents
    agentNodes.forEach(node => {
      const data = node.data as AgentNodeData;
      
      // Find connected handoffs
      const handoffs = edges
        .filter(edge => 
          edge.source === node.id && 
          edge.data?.connectionType === ConnectionType.HANDOFF
        )
        .map(edge => edge.target);
      
      // Find connected tools
      const tools = edges
        .filter(edge => 
          edge.target === node.id && 
          edge.data?.connectionType === ConnectionType.TOOL
        )
        .map(edge => edge.source);
      
      code += `${data.name.toLowerCase().replace(/\s+/g, '_')} = Agent(\n`;
      code += `    name="${data.name}",\n`;
      
      if (data.handoff_description) {
        code += `    handoff_description="${data.handoff_description}",\n`;
      }
      
      code += `    instructions="${data.instructions}",\n`;
      
      // Add handoffs if any
      if (handoffs.length > 0) {
        const handoffVars = handoffs
          .map(id => {
            const node = nodes.find(n => n.id === id);
            return node ? (node.data as AgentNodeData).name.toLowerCase().replace(/\s+/g, '_') : '';
          })
          .filter(Boolean);
        
        if (handoffVars.length > 0) {
          code += `    handoffs=[${handoffVars.join(', ')}],\n`;
        }
      }
      
      // Add tools if any
      if (tools.length > 0) {
        const toolVars = tools
          .map(id => {
            const node = nodes.find(n => n.id === id);
            return node ? (node.data as FunctionToolNodeData).name : '';
          })
          .filter(Boolean);
        
        if (toolVars.length > 0) {
          code += `    tools=[${toolVars.join(', ')}],\n`;
        }
      }
      
      // Add output type if specified
      if (data.output_type && data.output_type !== '') {
        code += `    output_type=${data.output_type},\n`;
      }
      
      code += ')\n\n';
    });
    
    // Add runner code
    if (runnerNodes.length > 0) {
      // Find which agent is connected to the runner
      const runnerNode = runnerNodes[0]; // Take the first runner for simplicity
      const connectedAgentEdge = edges.find(edge => 
        edge.target === runnerNode.id && 
        edge.data?.connectionType === ConnectionType.EXECUTION
      );
      
      if (connectedAgentEdge) {
        const agentNode = nodes.find(node => node.id === connectedAgentEdge.source);
        
        if (agentNode) {
          const agentData = agentNode.data as AgentNodeData;
          const runnerData = runnerNode.data as RunnerNodeData;
          
          if (runnerData.isAsync) {
            code += 'async def main():\n';
            code += `    result = await Runner.run(${agentData.name.toLowerCase().replace(/\s+/g, '_')}, input="${runnerData.input}"`;
            
            if (runnerData.context && runnerData.context.trim() !== '') {
              code += `, context=${runnerData.context}`;
            }
            
            code += ')\n';
            code += '    print(result.final_output)\n\n';
            code += 'if __name__ == "__main__":\n';
            code += '    asyncio.run(main())\n';
          } else {
            code += `result = Runner.run_sync(${agentData.name.toLowerCase().replace(/\s+/g, '_')}, "${runnerData.input}"`;
            
            if (runnerData.context && runnerData.context.trim() !== '') {
              code += `, context=${runnerData.context}`;
            }
            
            code += ')\n';
            code += 'print(result.final_output)\n';
          }
        }
      }
    }
    
    return code;
  }, [nodes, edges]);

  return (
    <WorkflowContext.Provider
      value={{
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        reactFlowInstance,
        setReactFlowInstance,
        addNode,
        updateNodeData,
        selectedNode,
        setSelectedNode,
        generateCode
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};
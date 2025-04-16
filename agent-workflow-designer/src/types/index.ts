import { Node, Edge } from 'reactflow';

// Node Types
export enum NodeType {
  AGENT = 'agent',
  RUNNER = 'runner',
  FUNCTION_TOOL = 'functionTool',
  GUARDRAIL = 'guardrail'
}

// Base Node Data
export interface BaseNodeData {
  label: string;
  type: NodeType;
}

// Agent Node Data
export interface AgentNodeData extends BaseNodeData {
  name: string;
  instructions: string;
  handoff_description?: string;
  output_type: string;
  handoffs: string[];
  tools: string[];
}

// Runner Node Data
export interface RunnerNodeData extends BaseNodeData {
  input: string;
  isAsync: boolean;
  context?: string;
}

// Function Tool Node Data
export interface FunctionToolNodeData extends BaseNodeData {
  name: string;
  parameters: {
    name: string;
    type: string;
    description?: string;
  }[];
  returnType: string;
  implementation: string;
}

// Guardrail Node Data
export interface GuardrailNodeData extends BaseNodeData {
  name: string;
  instructions: string;
  output_type: string;
}

// Custom Node Types
export type CustomNode = Node<AgentNodeData | RunnerNodeData | FunctionToolNodeData | GuardrailNodeData>;

// Connection Types
export enum ConnectionType {
  HANDOFF = 'handoff',
  TOOL = 'tool',
  EXECUTION = 'execution'
}

// Custom Edge Data
export interface CustomEdgeData {
  connectionType: ConnectionType;
}

// Custom Edge
export type CustomEdge = Edge<CustomEdgeData>;

// Workflow Type
export interface Workflow {
  nodes: CustomNode[];
  edges: CustomEdge[];
}
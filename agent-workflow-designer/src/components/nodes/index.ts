import AgentNode from './AgentNode';
import RunnerNode from './RunnerNode';
import FunctionToolNode from './FunctionToolNode';
import GuardrailNode from './GuardrailNode';
import { NodeType } from '../../types';

// Node type to component mapping
export const nodeTypes = {
  [NodeType.AGENT]: AgentNode,
  [NodeType.RUNNER]: RunnerNode,
  [NodeType.FUNCTION_TOOL]: FunctionToolNode,
  [NodeType.GUARDRAIL]: GuardrailNode,
};

export {
  AgentNode,
  RunnerNode,
  FunctionToolNode,
  GuardrailNode
};
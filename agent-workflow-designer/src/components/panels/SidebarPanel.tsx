import React from 'react';
import { Card, Typography, Divider } from 'antd';
import { UserOutlined, PlayCircleOutlined, ToolOutlined, SafetyOutlined } from '@ant-design/icons';
import { NodeType } from '../../types';
import { useWorkflow } from '../../context/WorkflowContext';

const { Title, Text, Paragraph } = Typography;

interface NodeItemProps {
  type: NodeType;
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const NodeItem: React.FC<NodeItemProps> = ({ type, label, icon, description, color }) => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Card
      size="small"
      style={{
        marginBottom: 12,
        cursor: 'grab',
        borderTop: `3px solid ${color}`,
      }}
      draggable
      onDragStart={(event) => onDragStart(event, type)}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: 12, color }}>{icon}</div>
        <div>
          <Text strong>{label}</Text>
          <Paragraph
            style={{ fontSize: '12px', color: '#666', margin: '4px 0 0 0' }}
            ellipsis={{ rows: 2 }}
          >
            {description}
          </Paragraph>
        </div>
      </div>
    </Card>
  );
};

const SidebarPanel: React.FC = () => {
  return (
    <div
      style={{
        padding: '16px',
        borderRight: '1px solid #f0f0f0',
        height: '100%',
        width: '250px',
        backgroundColor: '#fafafa',
        overflowY: 'auto',
      }}
    >
      <Title level={4}>Components</Title>
      <Paragraph type="secondary">
        Drag and drop components to the canvas to build your workflow.
      </Paragraph>

      <Divider style={{ margin: '12px 0' }} />

      <NodeItem
        type={NodeType.AGENT}
        label="Agent"
        icon={<UserOutlined />}
        description="An agent with instructions that can perform tasks."
        color="#3498db"
      />

      <NodeItem
        type={NodeType.RUNNER}
        label="Runner"
        icon={<PlayCircleOutlined />}
        description="Executes an agent with input and returns the result."
        color="#e74c3c"
      />

      <NodeItem
        type={NodeType.FUNCTION_TOOL}
        label="Function Tool"
        icon={<ToolOutlined />}
        description="A function that can be used by an agent."
        color="#f39c12"
      />

      <NodeItem
        type={NodeType.GUARDRAIL}
        label="Guardrail"
        icon={<SafetyOutlined />}
        description="Adds safety checks and constraints to agent behavior."
        color="#9b59b6"
      />

      <Divider style={{ margin: '12px 0' }} />

      <Title level={5}>How to Use</Title>
      <Paragraph style={{ fontSize: '12px' }}>
        1. Drag components to the canvas
      </Paragraph>
      <Paragraph style={{ fontSize: '12px' }}>
        2. Connect nodes by dragging from handles
      </Paragraph>
      <Paragraph style={{ fontSize: '12px' }}>
        3. Click on nodes to edit properties
      </Paragraph>
      <Paragraph style={{ fontSize: '12px' }}>
        4. Generate code when finished
      </Paragraph>
    </div>
  );
};

export default SidebarPanel;
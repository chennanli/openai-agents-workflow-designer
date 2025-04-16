import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AgentNodeData } from '../../types';

const { Title, Text } = Typography;

const AgentNode: React.FC<NodeProps<AgentNodeData>> = ({ data, selected }) => {
  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserOutlined style={{ marginRight: 8, color: '#3498db' }} />
          <Text strong>{data.label}</Text>
        </div>
      }
      style={{
        width: 250,
        borderTop: '3px solid #3498db',
        boxShadow: selected ? '0 0 0 2px #3498db' : 'none',
      }}
      size="small"
    >
      <div style={{ padding: '8px 0' }}>
        <Text strong>Name:</Text> <Text>{data.name}</Text>
      </div>
      
      <div style={{ padding: '8px 0' }}>
        <Text strong>Instructions:</Text>
        <div style={{ 
          maxHeight: '80px', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          fontSize: '12px',
          color: '#666',
          marginTop: '4px'
        }}>
          {data.instructions.length > 100 
            ? `${data.instructions.substring(0, 100)}...` 
            : data.instructions}
        </div>
      </div>
      
      {data.output_type && (
        <div style={{ padding: '8px 0' }}>
          <Text strong>Output Type:</Text> <Text>{data.output_type}</Text>
        </div>
      )}
      
      {data.handoffs.length > 0 && (
        <div style={{ padding: '8px 0' }}>
          <Text strong>Handoffs:</Text> <Text>{data.handoffs.length} agent(s)</Text>
        </div>
      )}
      
      {data.tools.length > 0 && (
        <div style={{ padding: '8px 0' }}>
          <Text strong>Tools:</Text> <Text>{data.tools.length} tool(s)</Text>
        </div>
      )}
      
      {/* Input handle - top */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#3498db' }}
      />
      
      {/* Output handle - bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#3498db' }}
      />
      
      {/* Output handle - right (for handoffs) */}
      <Handle
        type="source"
        position={Position.Right}
        id="handoff"
        style={{ background: '#3498db', top: '30%' }}
      />
    </Card>
  );
};

export default memo(AgentNode);
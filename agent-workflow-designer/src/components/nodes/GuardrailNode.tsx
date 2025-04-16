import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, Typography } from 'antd';
import { SafetyOutlined } from '@ant-design/icons';
import { GuardrailNodeData } from '../../types';

const { Title, Text } = Typography;

const GuardrailNode: React.FC<NodeProps<GuardrailNodeData>> = ({ data, selected }) => {
  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SafetyOutlined style={{ marginRight: 8, color: '#9b59b6' }} />
          <Text strong>{data.label}</Text>
        </div>
      }
      style={{
        width: 250,
        borderTop: '3px solid #9b59b6',
        boxShadow: selected ? '0 0 0 2px #9b59b6' : 'none',
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
      
      <div style={{ padding: '8px 0' }}>
        <Text strong>Output Type:</Text> <Text>{data.output_type}</Text>
      </div>
      
      {/* Input handle - top */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#9b59b6' }}
      />
      
      {/* Output handle - bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#9b59b6' }}
      />
    </Card>
  );
};

export default memo(GuardrailNode);
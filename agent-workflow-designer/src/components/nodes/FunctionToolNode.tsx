import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, Typography, Tag } from 'antd';
import { ToolOutlined } from '@ant-design/icons';
import { FunctionToolNodeData } from '../../types';

const { Title, Text } = Typography;

const FunctionToolNode: React.FC<NodeProps<FunctionToolNodeData>> = ({ data, selected }) => {
  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ToolOutlined style={{ marginRight: 8, color: '#f39c12' }} />
          <Text strong>{data.label}</Text>
        </div>
      }
      style={{
        width: 250,
        borderTop: '3px solid #f39c12',
        boxShadow: selected ? '0 0 0 2px #f39c12' : 'none',
      }}
      size="small"
    >
      <div style={{ padding: '8px 0' }}>
        <Text strong>Name:</Text> <Text>{data.name}</Text>
      </div>
      
      <div style={{ padding: '8px 0' }}>
        <Text strong>Return Type:</Text> <Text>{data.returnType}</Text>
      </div>
      
      <div style={{ padding: '8px 0' }}>
        <Text strong>Parameters:</Text>
        {data.parameters.length === 0 ? (
          <Text type="secondary">No parameters</Text>
        ) : (
          <div style={{ marginTop: '4px' }}>
            {data.parameters.map((param, index) => (
              <Tag key={index} style={{ marginBottom: '4px' }}>
                {param.name}: {param.type}
              </Tag>
            ))}
          </div>
        )}
      </div>
      
      <div style={{ padding: '8px 0' }}>
        <Text strong>Implementation:</Text>
        <div style={{ 
          maxHeight: '60px', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          fontSize: '12px',
          color: '#666',
          marginTop: '4px',
          fontFamily: 'monospace',
          backgroundColor: '#f5f5f5',
          padding: '4px',
          borderRadius: '4px'
        }}>
          {data.implementation.split('\n').slice(0, 2).join('\n')}
          {data.implementation.split('\n').length > 2 && '...'}
        </div>
      </div>
      
      {/* Output handle - bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#f39c12' }}
      />
    </Card>
  );
};

export default memo(FunctionToolNode);
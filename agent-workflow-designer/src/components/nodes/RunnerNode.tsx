import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, Typography, Switch, Tag } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { RunnerNodeData } from '../../types';

const { Title, Text } = Typography;

const RunnerNode: React.FC<NodeProps<RunnerNodeData>> = ({ data, selected }) => {
  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <PlayCircleOutlined style={{ marginRight: 8, color: '#e74c3c' }} />
          <Text strong>{data.label}</Text>
        </div>
      }
      style={{
        width: 250,
        borderTop: '3px solid #e74c3c',
        boxShadow: selected ? '0 0 0 2px #e74c3c' : 'none',
      }}
      size="small"
    >
      <div style={{ padding: '8px 0' }}>
        <Text strong>Input:</Text>
        <div style={{ 
          maxHeight: '60px', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          fontSize: '12px',
          color: '#666',
          marginTop: '4px'
        }}>
          {data.input.length > 100 
            ? `${data.input.substring(0, 100)}...` 
            : data.input || '<No input provided>'}
        </div>
      </div>
      
      <div style={{ padding: '8px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text strong>Execution Mode:</Text>
        <Tag color={data.isAsync ? 'blue' : 'green'}>
          {data.isAsync ? 'Async' : 'Sync'}
        </Tag>
      </div>
      
      {data.context && (
        <div style={{ padding: '8px 0' }}>
          <Text strong>Context:</Text>
          <div style={{ 
            maxHeight: '40px', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            fontSize: '12px',
            color: '#666',
            marginTop: '4px'
          }}>
            {data.context}
          </div>
        </div>
      )}
      
      {/* Input handle - top */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#e74c3c' }}
      />
    </Card>
  );
};

export default memo(RunnerNode);
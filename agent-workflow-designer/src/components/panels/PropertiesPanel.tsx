import React from 'react';
import { Card, Typography, Input, Switch, Select, Button, Form, Space, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { useWorkflow } from '../../context/WorkflowContext';
import { NodeType, AgentNodeData, RunnerNodeData, FunctionToolNodeData, GuardrailNodeData } from '../../types';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const PropertiesPanel: React.FC = () => {
  const { selectedNode, updateNodeData } = useWorkflow();

  if (!selectedNode) {
    return (
      <div
        style={{
          padding: '16px',
          borderLeft: '1px solid #f0f0f0',
          height: '100%',
          width: '300px',
          backgroundColor: '#fafafa',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text type="secondary">Select a node to view properties</Text>
      </div>
    );
  }

  const handleChange = (key: string, value: any) => {
    updateNodeData(selectedNode.id, { [key]: value });
  };

  const renderAgentProperties = (data: AgentNodeData) => (
    <>
      <Form layout="vertical" style={{ marginBottom: 0 }}>
        <Form.Item label="Name" style={{ marginBottom: 12 }}>
          <Input
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Agent name"
          />
        </Form.Item>

        <Form.Item label="Instructions" style={{ marginBottom: 12 }}>
          <TextArea
            value={data.instructions}
            onChange={(e) => handleChange('instructions', e.target.value)}
            placeholder="Instructions for the agent"
            rows={4}
          />
        </Form.Item>

        <Form.Item label="Handoff Description (Optional)" style={{ marginBottom: 12 }}>
          <Input
            value={data.handoff_description}
            onChange={(e) => handleChange('handoff_description', e.target.value)}
            placeholder="Description for handoff"
          />
        </Form.Item>

        <Form.Item label="Output Type (Optional)" style={{ marginBottom: 12 }}>
          <Input
            value={data.output_type}
            onChange={(e) => handleChange('output_type', e.target.value)}
            placeholder="Pydantic model name"
          />
        </Form.Item>
      </Form>
    </>
  );

  const renderRunnerProperties = (data: RunnerNodeData) => (
    <>
      <Form layout="vertical" style={{ marginBottom: 0 }}>
        <Form.Item label="Input" style={{ marginBottom: 12 }}>
          <TextArea
            value={data.input}
            onChange={(e) => handleChange('input', e.target.value)}
            placeholder="Input for the agent"
            rows={4}
          />
        </Form.Item>

        <Form.Item label="Execution Mode" style={{ marginBottom: 12 }}>
          <Switch
            checked={data.isAsync}
            onChange={(checked) => handleChange('isAsync', checked)}
            checkedChildren="Async"
            unCheckedChildren="Sync"
          />
          <Text type="secondary" style={{ marginLeft: 8 }}>
            {data.isAsync ? 'Asynchronous execution' : 'Synchronous execution'}
          </Text>
        </Form.Item>

        <Form.Item label="Context (Optional)" style={{ marginBottom: 12 }}>
          <TextArea
            value={data.context}
            onChange={(e) => handleChange('context', e.target.value)}
            placeholder="Context for the runner"
            rows={3}
          />
        </Form.Item>
      </Form>
    </>
  );

  const renderFunctionToolProperties = (data: FunctionToolNodeData) => {
    const addParameter = () => {
      const newParams = [...data.parameters, { name: '', type: 'str', description: '' }];
      handleChange('parameters', newParams);
    };

    const updateParameter = (index: number, key: string, value: string) => {
      const newParams = [...data.parameters];
      newParams[index] = { ...newParams[index], [key]: value };
      handleChange('parameters', newParams);
    };

    const removeParameter = (index: number) => {
      const newParams = [...data.parameters];
      newParams.splice(index, 1);
      handleChange('parameters', newParams);
    };

    return (
      <>
        <Form layout="vertical" style={{ marginBottom: 0 }}>
          <Form.Item label="Function Name" style={{ marginBottom: 12 }}>
            <Input
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Function name"
            />
          </Form.Item>

          <Form.Item label="Return Type" style={{ marginBottom: 12 }}>
            <Select
              value={data.returnType}
              onChange={(value) => handleChange('returnType', value)}
              style={{ width: '100%' }}
            >
              <Option value="str">str</Option>
              <Option value="int">int</Option>
              <Option value="float">float</Option>
              <Option value="bool">bool</Option>
              <Option value="list">list</Option>
              <Option value="dict">dict</Option>
              <Option value="None">None</Option>
            </Select>
          </Form.Item>

          <Divider orientation="left" plain style={{ margin: '12px 0' }}>
            Parameters
          </Divider>

          {data.parameters.map((param, index) => (
            <div key={index} style={{ marginBottom: 12 }}>
              <Space style={{ display: 'flex', marginBottom: 8 }}>
                <Input
                  placeholder="Name"
                  value={param.name}
                  onChange={(e) => updateParameter(index, 'name', e.target.value)}
                  style={{ width: '40%' }}
                />
                <Select
                  placeholder="Type"
                  value={param.type}
                  onChange={(value) => updateParameter(index, 'type', value)}
                  style={{ width: '40%' }}
                >
                  <Option value="str">str</Option>
                  <Option value="int">int</Option>
                  <Option value="float">float</Option>
                  <Option value="bool">bool</Option>
                  <Option value="list">list</Option>
                  <Option value="dict">dict</Option>
                </Select>
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => removeParameter(index)}
                  type="text"
                  danger
                />
              </Space>
              <Input
                placeholder="Description (optional)"
                value={param.description}
                onChange={(e) => updateParameter(index, 'description', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          ))}

          <Button
            type="dashed"
            onClick={addParameter}
            block
            icon={<PlusOutlined />}
            style={{ marginBottom: 16 }}
          >
            Add Parameter
          </Button>

          <Form.Item label="Implementation" style={{ marginBottom: 12 }}>
            <TextArea
              value={data.implementation}
              onChange={(e) => handleChange('implementation', e.target.value)}
              placeholder="Function implementation"
              rows={6}
              style={{ fontFamily: 'monospace' }}
            />
          </Form.Item>
        </Form>
      </>
    );
  };

  const renderGuardrailProperties = (data: GuardrailNodeData) => (
    <>
      <Form layout="vertical" style={{ marginBottom: 0 }}>
        <Form.Item label="Name" style={{ marginBottom: 12 }}>
          <Input
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Guardrail name"
          />
        </Form.Item>

        <Form.Item label="Instructions" style={{ marginBottom: 12 }}>
          <TextArea
            value={data.instructions}
            onChange={(e) => handleChange('instructions', e.target.value)}
            placeholder="Instructions for the guardrail"
            rows={4}
          />
        </Form.Item>

        <Form.Item label="Output Type" style={{ marginBottom: 12 }}>
          <Input
            value={data.output_type}
            onChange={(e) => handleChange('output_type', e.target.value)}
            placeholder="Pydantic model name"
          />
        </Form.Item>
      </Form>
    </>
  );

  const renderProperties = () => {
    const data = selectedNode.data;

    switch (data.type) {
      case NodeType.AGENT:
        return renderAgentProperties(data as AgentNodeData);
      case NodeType.RUNNER:
        return renderRunnerProperties(data as RunnerNodeData);
      case NodeType.FUNCTION_TOOL:
        return renderFunctionToolProperties(data as FunctionToolNodeData);
      case NodeType.GUARDRAIL:
        return renderGuardrailProperties(data as GuardrailNodeData);
      default:
        return <Text>Unknown node type</Text>;
    }
  };

  return (
    <div
      style={{
        padding: '16px',
        borderLeft: '1px solid #f0f0f0',
        height: '100%',
        width: '300px',
        backgroundColor: '#fafafa',
        overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>Properties</Title>
        <Button type="text" icon={<CloseOutlined />} />
      </div>

      <Card
        size="small"
        title={selectedNode.data.label}
        style={{
          marginBottom: 16,
          borderTop: `3px solid ${
            selectedNode.data.type === NodeType.AGENT
              ? '#3498db'
              : selectedNode.data.type === NodeType.RUNNER
              ? '#e74c3c'
              : selectedNode.data.type === NodeType.FUNCTION_TOOL
              ? '#f39c12'
              : '#9b59b6'
          }`,
        }}
      >
        <Text type="secondary">ID: {selectedNode.id}</Text>
      </Card>

      {renderProperties()}
    </div>
  );
};

export default PropertiesPanel;
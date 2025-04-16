import React, { useEffect, useState } from 'react';
import { Modal, Button, Typography, Space, Tabs } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { useWorkflow } from '../../context/WorkflowContext';

const { Text, Paragraph } = Typography;
const { TabPane } = Tabs;

interface CodeGenerationModalProps {
  visible: boolean;
  onClose: () => void;
}

const CodeGenerationModal: React.FC<CodeGenerationModalProps> = ({ visible, onClose }) => {
  const { generateCode } = useWorkflow();
  const [code, setCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      // Generate code when modal becomes visible
      const generatedCode = generateCode();
      setCode(generatedCode);
      setCopied(false);
    }
  }, [visible, generateCode]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Modal
      title="Generated OpenAI Agents SDK Code"
      open={visible}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button
          key="copy"
          type="primary"
          icon={copied ? <CheckOutlined /> : <CopyOutlined />}
          onClick={handleCopyCode}
        >
          {copied ? 'Copied!' : 'Copy Code'}
        </Button>,
      ]}
    >
      <Tabs defaultActiveKey="code">
        <TabPane tab="Code" key="code">
          <div
            style={{
              backgroundColor: '#f5f5f5',
              padding: '16px',
              borderRadius: '4px',
              maxHeight: '500px',
              overflowY: 'auto',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              fontSize: '14px',
            }}
          >
            {code}
          </div>
        </TabPane>
        <TabPane tab="Instructions" key="instructions">
          <Paragraph>
            This code is generated based on your workflow design. Here's how to use it:
          </Paragraph>
          
          <ol>
            <li>
              <Paragraph>
                <Text strong>Install the OpenAI Agents SDK:</Text>
                <div
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: '8px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    marginTop: '8px',
                  }}
                >
                  pip install agents
                </div>
              </Paragraph>
            </li>
            
            <li>
              <Paragraph>
                <Text strong>Save the generated code to a Python file (e.g., agent_workflow.py)</Text>
              </Paragraph>
            </li>
            
            <li>
              <Paragraph>
                <Text strong>Run the code:</Text>
                <div
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: '8px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    marginTop: '8px',
                  }}
                >
                  python agent_workflow.py
                </div>
              </Paragraph>
            </li>
            
            <li>
              <Paragraph>
                <Text strong>Customize as needed:</Text> You may need to modify the generated code to add specific implementation details, especially for function tools and Pydantic models.
              </Paragraph>
            </li>
          </ol>
          
          <Paragraph>
            <Text strong>Note:</Text> Make sure you have the necessary API keys set up for OpenAI in your environment.
          </Paragraph>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default CodeGenerationModal;
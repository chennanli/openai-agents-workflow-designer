import React, { useState } from 'react';
import { Layout, Button, Typography } from 'antd';
import { CodeOutlined, SaveOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { WorkflowProvider } from './context/WorkflowContext';
import WorkflowEditor from './components/WorkflowEditor';
import { CodeGenerationModal } from './components/modals';
import './App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [codeModalVisible, setCodeModalVisible] = useState<boolean>(false);

  const showCodeModal = () => {
    setCodeModalVisible(true);
  };

  const hideCodeModal = () => {
    setCodeModalVisible(false);
  };

  return (
    <WorkflowProvider>
      <Layout style={{ height: '100vh', width: '100vw' }}>
        <Header style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '0 24px',
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
        }}>
          <Title level={3} style={{ margin: 0 }}>
            OpenAI Agents Workflow Designer
          </Title>
          <div>
            <Button 
              icon={<SaveOutlined />} 
              style={{ marginRight: 8 }}
            >
              Save
            </Button>
            <Button 
              icon={<FolderOpenOutlined />} 
              style={{ marginRight: 8 }}
            >
              Load
            </Button>
            <Button 
              type="primary" 
              icon={<CodeOutlined />} 
              onClick={showCodeModal}
            >
              Generate Code
            </Button>
          </div>
        </Header>
        <Content style={{ height: 'calc(100vh - 64px)' }}>
          <WorkflowEditor />
        </Content>
      </Layout>

      <CodeGenerationModal 
        visible={codeModalVisible} 
        onClose={hideCodeModal} 
      />
    </WorkflowProvider>
  );
};

export default App;

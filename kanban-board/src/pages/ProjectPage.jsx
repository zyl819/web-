import React, { useState, useEffect } from 'react';
import { List, Button, Input, Form, Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Header, Content } = Layout;
const { Title } = Typography;

function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get(`/api/projects/${username}`);
        setProjects(response.data);
      } catch (error) {
        console.error('获取项目失败', error);
      }
    }
    fetchProjects();
  }, [username]);

  const addProject = async (values) => {
    try {
      const response = await axios.post('/api/projects', {
        username,
        name: values.name,
      });
      if (response.data && response.data.name) {
        setProjects([...projects, response.data]);
        form.resetFields();
      } else {
        console.error('Failed to create project:', response.data);
      }
    } catch (error) {
      console.error('创建项目失败', error);
    }
  };

  const selectProject = (projectId) => {
    navigate(`/projects/${projectId}/tasks`);
  };

  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
        <div style={styles.headerContent}>
          <Title level={3} style={styles.title}>项目管理系统</Title>
          <span style={styles.username}>{username}</span>
        </div>
      </Header>
      <Content style={styles.content}>
        <div style={styles.projectContainer}>
          <h2 style={styles.listTitle}>{username}的项目列表</h2>
          <List
            bordered
            dataSource={projects}
            renderItem={(project, index) => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => selectProject(project.id)}>
                    进入项目
                  </Button>
                ]}
              >
                {index + 1}. {project.name}
              </List.Item>
            )}
          />
          <h3 style={styles.subtitle}>创建新项目</h3>
          <Form form={form} onFinish={addProject} layout="vertical" style={styles.form}>
            <Form.Item
              name="name"
              label="项目名称"
              rules={[{ required: true, message: '请输入项目名称' }]}
              style={styles.formItem}
            >
              <Input placeholder="请输入项目名称" style={styles.input} />
            </Form.Item>
            <Form.Item style={styles.formItem}>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                创建项目
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}

const styles = {
  layout: {
    minHeight: '100vh',
    width: '100vw',
    backgroundImage: 'linear-gradient(to right, #f5f7fa, #c3cfe2)', // 添加背景颜色
  },
  header: {
    backgroundColor: '#001529',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    color: '#fff',
    margin: 0,
  },
  username: {
    color: '#fff',
    fontSize: '16px',
  },
  content: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
  },
  projectContainer: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
  },
  listTitle: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  subtitle: {
    marginTop: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formItem: {
    width: '100%',
  },
  input: {
    width: '100%',
  },
};

export default ProjectPage;

import React, { useState, useEffect } from 'react';
import { List, Button, Input, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        console.log('Project created and added to list:', response.data);
      } else {
        console.error('Failed to create project:', response.data);
      }
    } catch (error) {
      console.error('创建项目失败', error);
    }
  };

  const selectProject = (id) => {
    navigate(`/projects/${id}/tasks`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.projectContainer}>
        <h2 style={styles.title}>项目列表</h2>
        <List
          bordered
          dataSource={projects}
          renderItem={(project, index) => (
            <List.Item onClick={() => selectProject(project.id)}>
              {index + 1}. {project.name}
            </List.Item>
          )}
        />
        <h3 style={styles.subtitle}>创建新项目</h3>
        <Form form={form} onFinish={addProject} layout="vertical">
          <Form.Item
            name="name"
            label="项目名称"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input placeholder="请输入项目名称" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              创建项目
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    backgroundColor: '#f0f2f5',
    boxSizing: 'border-box',
  },
  projectContainer: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  subtitle: {
    marginTop: '20px',
  },
};

export default ProjectPage;

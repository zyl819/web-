import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('/api/login', { username: values.username });
      if (response.data) {
        localStorage.setItem('username', response.data.username);
        navigate('/projects');
      }
    } catch (error) {
      console.error('登录失败', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2>登录</h2>
        <Form name="login" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              登录
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
  formContainer: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px',
    width: '100%',
  },
};

export default LoginPage;

import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function LoginPage() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    localStorage.setItem('username', values.username);
    navigate('/projects');  // 修改为导航到项目页面
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Title level={2} style={styles.headerTitle}>任务看板</Title>
      </div>
      <Card style={styles.card}>
        <Title level={3} style={styles.title}>登录到项目管理系统</Title>
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          style={styles.form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
            style={styles.formItem}
          >
            <Input placeholder="请输入用户名" style={styles.input} />
          </Form.Item>

          <Form.Item style={styles.formItem}>
            <Button type="primary" htmlType="submit" style={styles.button}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column', 
    height: '100vh',
    backgroundImage: 'linear-gradient(to right, #6a11cb, #2575fc)', 
    margin: 0, 
    padding: 0, 
    boxSizing: 'border-box',
    width: '100vw', 
  },
  header: {
    marginBottom: '20px', 
  },
  headerTitle: {
    color: '#fff', 
    textAlign: 'center',
  },
  card: {
    width: '100%', 
    maxWidth: '400px', 
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    background: '#fff', 
    zIndex: 2, 
  },
  title: {
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    width: '100%',
  },
  formItem: {
    marginBottom: '15px',
  },
  input: {
    height: '40px',
    borderRadius: '5px',
  },
  button: {
    width: '100%',
    height: '40px',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
};

export default LoginPage;

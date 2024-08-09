import React, { useState } from 'react';
import { Card, Col, Row, Form, Input, Button, Select } from 'antd';
import TaskCard from '../components/TaskCard';

const { TextArea } = Input;
const { Option } = Select;

function BoardPage() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [form] = Form.useForm();

  const addTask = (values) => {
    const newTask = {
      id: Date.now(),
      title: values.title,
      description: values.description,
      status: values.status,
    };

    setTasks((prevTasks) => ({
      ...prevTasks,
      [values.status]: [...prevTasks[values.status], newTask],
    }));

    form.resetFields();
  };

  const changeTaskStatus = (taskId, newStatus) => {
    let taskToMove;

    setTasks((prevTasks) => {
      const updatedTasks = {
        todo: prevTasks.todo.filter((task) => {
          if (task.id === taskId) taskToMove = task;
          return task.id !== taskId;
        }),
        inProgress: prevTasks.inProgress.filter((task) => {
          if (task.id === taskId) taskToMove = task;
          return task.id !== taskId;
        }),
        done: prevTasks.done.filter((task) => {
          if (task.id === taskId) taskToMove = task;
          return task.id !== taskId;
        }),
      };

      if (taskToMove) {
        taskToMove.status = newStatus;
        updatedTasks[newStatus] = [...updatedTasks[newStatus], taskToMove];
      }

      return updatedTasks;
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.boardContainer}>
        <h2 style={styles.title}>项目任务看板</h2>

        <Form form={form} onFinish={addTask} layout="vertical" style={styles.form}>
          <Form.Item name="title" label="任务标题" rules={[{ required: true, message: '请输入任务标题' }]}>
            <Input placeholder="请输入任务标题" />
          </Form.Item>

          <Form.Item name="description" label="任务描述">
            <TextArea rows={4} placeholder="请输入任务描述" />
          </Form.Item>

          <Form.Item name="status" label="任务状态" rules={[{ required: true, message: '请选择任务状态' }]}>
            <Select placeholder="请选择任务状态">
              <Option value="todo">待处理</Option>
              <Option value="inProgress">进行中</Option>
              <Option value="done">已完成</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              添加任务
            </Button>
          </Form.Item>
        </Form>

        <Row gutter={16}>
          <Col span={8}>
            <h3>待处理</h3>
            {tasks.todo.map((task) => (
              <TaskCard key={task.id} task={task} onChangeStatus={changeTaskStatus} />
            ))}
          </Col>
          <Col span={8}>
            <h3>进行中</h3>
            {tasks.inProgress.map((task) => (
              <TaskCard key={task.id} task={task} onChangeStatus={changeTaskStatus} />
            ))}
          </Col>
          <Col span={8}>
            <h3>已完成</h3>
            {tasks.done.map((task) => (
              <TaskCard key={task.id} task={task} onChangeStatus={changeTaskStatus} />
            ))}
          </Col>
        </Row>
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
  boardContainer: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    width: '100%',
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    marginBottom: '40px',
  },
};

export default BoardPage;

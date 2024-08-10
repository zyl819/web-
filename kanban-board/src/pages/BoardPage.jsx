import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import TaskCard from '../components/TaskCard';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

function BoardPage() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [form] = Form.useForm();
  const username = localStorage.getItem('username');

  const addTask = (values) => {
    const newTask = {
      id: Date.now(),
      title: values.title,
      description: values.description,
      status: values.status,
      deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : null,  // 保存截止日期
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
    <div style={styles.board}>
      <div style={styles.usernameContainer}>
        <span style={styles.username}>{username}</span>
      </div>
      <div style={styles.listsContainer}>
        <div style={styles.list}>
          <h3 style={styles.listTitle}>待处理</h3>
          {tasks.todo.map((task) => (
            <TaskCard key={task.id} task={task} onChangeStatus={changeTaskStatus} />
          ))}
        </div>
        <div style={styles.list}>
          <h3 style={styles.listTitle}>进行中</h3>
          {tasks.inProgress.map((task) => (
            <TaskCard key={task.id} task={task} onChangeStatus={changeTaskStatus} />
          ))}
        </div>
        <div style={styles.list}>
          <h3 style={styles.listTitle}>已完成</h3>
          {tasks.done.map((task) => (
            <TaskCard key={task.id} task={task} onChangeStatus={changeTaskStatus} />
          ))}
        </div>
        <Form form={form} onFinish={addTask} layout="vertical" style={styles.form}>
          <Form.Item name="title" label="任务标题" rules={[{ required: true, message: '请输入任务标题' }]}>
            <Input placeholder="请输入任务标题" style={styles.input} />
          </Form.Item>

          <Form.Item name="description" label="任务描述">
            <TextArea rows={4} placeholder="请输入任务描述" style={styles.input} />
          </Form.Item>

          <Form.Item name="status" label="任务状态" rules={[{ required: true, message: '请选择任务状态' }]}>
            <Select placeholder="请选择任务状态" style={styles.input}>
              <Option value="todo">待处理</Option>
              <Option value="inProgress">进行中</Option>
              <Option value="done">已完成</Option>
            </Select>
          </Form.Item>

          <Form.Item name="deadline" label="截止日期">
            <DatePicker placeholder="请选择截止日期" style={styles.input} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              添加任务
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const styles = {
  board: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh',
    width: '100vw',
    padding: '20px',
    backgroundColor: '#f0f2f5',
    overflowX: 'auto',
    boxSizing: 'border-box',
    position: 'relative',
  },
  usernameContainer: {
    position: 'absolute',
    top: '10px',
    right: '20px',
  },
  username: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  listsContainer: {
    display: 'flex',
    gap: '20px',
  },
  list: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '10px',
    minWidth: '300px',
    maxWidth: '300px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  listTitle: {
    textAlign: 'center',
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '10px',
    minWidth: '300px',
    maxWidth: '300px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
  },
};

export default BoardPage;

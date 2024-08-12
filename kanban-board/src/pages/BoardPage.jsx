import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, Layout, Typography, Upload } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TaskCard from '../components/TaskCard';

const { Header, Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

function BoardPage() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });
  const [fileList, setFileList] = useState([]); // 初始化 fileList
  const [projectName, setProjectName] = useState('');
  const [form] = Form.useForm();
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchedProjectName = "示例项目名称"; // 示例项目名称
    setProjectName(fetchedProjectName);

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectId}/tasks`, {
          params: { username },
        });
        setTasks(response.data || { todo: [], inProgress: [], done: [] }); // 确保 tasks 有默认值
      } catch (error) {
        console.error('获取任务失败', error);
      }
    };
    fetchTasks();
  }, [projectId, username]);

  const addTask = (values) => {
    const newTask = {
      id: Date.now(),
      title: values.title,
      description: values.description,
      status: values.status,
      deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : null,
      attachments: fileList,  // 使用 fileList 保存附件
    };

    setTasks((prevTasks) => {
      const updatedStatusTasks = prevTasks[values.status] || []; // 确保值是一个数组
      return {
        ...prevTasks,
        [values.status]: [...updatedStatusTasks, newTask],
      };
    });

    setFileList([]); // 重置 fileList
    form.resetFields();
  };

  const changeTaskStatus = (taskId, newStatus) => {
    let taskToMove;
  
    setTasks((prevTasks) => {
      const updatedTasks = {
        todo: prevTasks.todo ? prevTasks.todo.filter((task) => {
          if (task.id === taskId) taskToMove = task;
          return task.id !== taskId;
        }) : [],
        inProgress: prevTasks.inProgress ? prevTasks.inProgress.filter((task) => {
          if (task.id === taskId) taskToMove = task;
          return task.id !== taskId;
        }) : [],
        done: prevTasks.done ? prevTasks.done.filter((task) => {
          if (task.id === taskId) taskToMove = task;
          return task.id !== taskId;
        }) : [],
      };
  
      if (taskToMove) {
        taskToMove.status = newStatus;
        updatedTasks[newStatus] = [...updatedTasks[newStatus], taskToMove];
      }
  
      return updatedTasks;
    });
  };
  

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
        <div style={styles.headerContent}>
          <Title level={3} style={styles.projectName}>任务面板</Title>
          <span style={styles.username}>{username}</span>
        </div>
      </Header>
      <Content style={styles.content}>
        <div style={styles.listsContainer}>
          <div style={styles.list}>
            <h3 style={styles.listTitle}>待处理</h3>
            {tasks.todo?.map((task) => (
              <TaskCard key={task.id} task={task} onChangeStatus={changeTaskStatus} />
            ))}
          </div>
          <div style={styles.list}>
            <h3 style={styles.listTitle}>进行中</h3>
            {tasks.inProgress?.map((task) => (
              <TaskCard key={task.id} task={task} onChangeStatus={changeTaskStatus} />
            ))}
          </div>
          <div style={styles.list}>
            <h3 style={styles.listTitle}>已完成</h3>
            {tasks.done?.map((task) => (
              <TaskCard key={task.id} task={task} onChangeStatus={changeTaskStatus} />
            ))}
          </div>
          <Form form={form} onFinish={addTask} layout="vertical" style={styles.form}>
            <Form.Item name="title" label="任务标题" rules={[{ required: true, message: '请输入任务标题' }]}>
              <Input placeholder="请输入任务标题" style={styles.input} />
            </Form.Item>

            <Form.Item name="description" label="任务评论">
              <TextArea rows={4} placeholder="请输入任务评论" style={styles.input} />
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

            <Form.Item name="attachments" label="附件">
              <Upload
                fileList={fileList}
                onChange={handleUploadChange}
              >
                <Button>上传文件</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                添加任务
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
    overflowX: 'hidden',
    backgroundImage: 'linear-gradient(to right, #f5f7fa, #c3cfe2)', // 设置背景颜色
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
  projectName: {
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
  listsContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1200px',
  },
  list: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '10px',
    flex: '1',
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
    flex: '1',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
  },
};

export default BoardPage;

import React from 'react';
import { Card, Button, Select } from 'antd';

const { Option } = Select;

function TaskCard({ task, onChangeStatus }) {
  const handleChangeStatus = (value) => {
    onChangeStatus(task.id, value);
  };

  return (
    <Card title={task.title} style={{ marginBottom: '10px' }}>
      <p>{task.description}</p>
      <Select defaultValue={task.status} style={{ width: '100%' }} onChange={handleChangeStatus}>
        <Option value="todo">待处理</Option>
        <Option value="inProgress">进行中</Option>
        <Option value="done">已完成</Option>
      </Select>
    </Card>
  );
}

export default TaskCard;

import React from 'react';
import { Card, Select } from 'antd';

const { Option } = Select;

function TaskCard({ task, onChangeStatus }) {
  return (
    <Card 
      title={task.title} 
      extra={<span>{task.deadline}</span>} 
      style={styles.card}  // 使用自定义样式
    >
      <p>{task.description}</p>
      <Select
        value={task.status}
        onChange={(value) => onChangeStatus(task.id, value)}
      >
        <Option value="todo">待处理</Option>
        <Option value="inProgress">进行中</Option>
        <Option value="done">已完成</Option>
      </Select>
    </Card>
  );
}

const styles = {
  card: {
    border: '2px solid #1890ff',  // 边框加粗并使用更显眼的颜色
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',  // 更明显的阴影
  },
};

export default TaskCard;

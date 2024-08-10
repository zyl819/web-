import React from 'react';
import { Card } from 'antd';

function TaskCard({ task, onChangeStatus }) {
  const handleStatusChange = (newStatus) => {
    onChangeStatus(task.id, newStatus);
  };

  return (
    <Card
      style={styles.card}
      title={task.title}
      extra={
        <Select defaultValue={task.status} onChange={handleStatusChange} style={styles.select}>
          <Option value="todo">待处理</Option>
          <Option value="inProgress">进行中</Option>
          <Option value="done">已完成</Option>
        </Select>
      }
    >
      <p>{task.description}</p>
      {task.deadline && <p style={styles.deadline}>截止日期: {task.deadline}</p>}
    </Card>
  );
}

const styles = {
  card: {
    marginBottom: '10px',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  select: {
    width: '120px',
  },
  deadline: {
    color: '#ff4d4f',
    marginTop: '10px',
  },
};

export default TaskCard;

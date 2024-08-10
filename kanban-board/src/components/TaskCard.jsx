import React from 'react';
import { Card } from 'antd';

function TaskCard({ task, onChangeStatus }) {
  return (
    <Card
      style={styles.card}
      title={task.title}
      extra={<span style={styles.status}>{task.status}</span>}
    >
      <p>{task.description}</p>
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
  status: {
    fontSize: '12px',
    color: '#999',
  },
};

export default TaskCard;

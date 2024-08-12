import React from 'react';
import { Card, Select } from 'antd';

const { Option } = Select;

function TaskCard({ task, onChangeStatus }) {
  // 根据任务状态设置卡片的背景颜色
  const getCardStyle = () => {
    switch (task.status) {
      case 'todo':
        return { backgroundColor: '#fff4e6', borderColor: '#ffa940' }; // 浅橙色
      case 'inProgress':
        return { backgroundColor: '#e6f7ff', borderColor: '#69c0ff' }; // 浅蓝色
      case 'done':
        return { backgroundColor: '#f6ffed', borderColor: '#73d13d' }; // 浅绿色
      default:
        return { backgroundColor: '#ffffff', borderColor: '#d9d9d9' }; // 默认白色
    }
  };

  return (
    <Card 
      title={task.title} 
      extra={<span>{task.deadline}</span>} 
      style={{ ...styles.card, ...getCardStyle() }}  // 动态应用样式
    >
      <p>{task.description}</p>

      {task.attachments && task.attachments.length > 0 && (
        <div style={styles.attachmentsContainer}>
          <strong>附件:</strong>
          <ul style={styles.attachmentList}>
            {task.attachments.map((attachment, index) => (
              <li key={index}>
                <a href={attachment.url} download={attachment.name}>
                  {attachment.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Select
        value={task.status}
        onChange={(value) => onChangeStatus(task.id, value)}
        style={styles.select}
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
    border: '2px solid',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    marginBottom: '16px',
  },
  attachmentsContainer: {
    marginTop: '12px',
  },
  attachmentList: {
    paddingLeft: '16px',
  },
  select: {
    marginTop: '12px',
    width: '100%',
  },
};

export default TaskCard;

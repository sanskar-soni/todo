import React, { useState } from 'react';
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
  Divider,
  Chip,
} from '@mui/material';
import {
  Delete,
  Edit,
  CheckCircle,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import { useTaskList } from '../../context/TaskListContext';

function TaskList({ listId }) {
  const { getTasksForList, dispatch } = useTaskList();
  const tasks = getTasksForList(listId);

  const handleToggleTask = (taskId) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  };

  const handleDeleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);

  if (tasks.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: 2,
          border: '1px solid #e0e0e0',
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No tasks yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click the + button to add your first task
        </Typography>
      </Paper>
    );
  }

  const TaskItem = ({ task }) => (
    <ListItem
      disablePadding
      sx={{
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      <ListItemButton
        onClick={() => handleToggleTask(task.id)}
        sx={{ borderRadius: 1 }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          {task.completed ? (
            <CheckCircle color="success" />
          ) : (
            <RadioButtonUnchecked color="action" />
          )}
        </ListItemIcon>
        <ListItemText
          primary={task.title}
          secondary={task.description}
          primaryTypographyProps={{
            sx: {
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'text.secondary' : 'text.primary',
            },
          }}
          secondaryTypographyProps={{
            sx: {
              textDecoration: task.completed ? 'line-through' : 'none',
            },
          }}
        />
        {task.dueDate && (
          <Chip
            label={new Date(task.dueDate).toLocaleDateString()}
            size="small"
            variant="outlined"
            sx={{ mr: 1 }}
          />
        )}
      </ListItemButton>
      <IconButton
        edge="end"
        onClick={() => handleDeleteTask(task.id)}
        sx={{ mr: 1 }}
      >
        <Delete color="action" />
      </IconButton>
    </ListItem>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Incomplete Tasks */}
      {incompleteTasks.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            border: '1px solid #e0e0e0',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 2, backgroundColor: '#fafafa' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Tasks ({incompleteTasks.length})
            </Typography>
          </Box>
          <List dense>
            {incompleteTasks.map((task, index) => (
              <React.Fragment key={task.id}>
                <TaskItem task={task} />
                {index < incompleteTasks.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            border: '1px solid #e0e0e0',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 2, backgroundColor: '#f0f8f0' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'success.dark' }}>
              Completed ({completedTasks.length})
            </Typography>
          </Box>
          <List dense>
            {completedTasks.map((task, index) => (
              <React.Fragment key={task.id}>
                <TaskItem task={task} />
                {index < completedTasks.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

export default TaskList;
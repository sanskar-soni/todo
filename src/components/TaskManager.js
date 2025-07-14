import React, { useState } from 'react';
import {
  Container,
  Fab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Chip,
  Box,
  Typography,
  Paper,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  RadioButtonUnchecked,
  CheckCircle
} from '@mui/icons-material';
import TaskForm from './TaskForm';

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Sample Task',
      description: 'This is a sample task to demonstrate the interface',
      priority: 'medium',
      dueDate: '2024-01-20',
      tags: ['sample', 'demo'],
      completed: false,
      createdAt: '2024-01-15T10:00:00Z'
    }
  ]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formMode, setFormMode] = useState('create');

  const handleCreateTask = () => {
    setEditingTask(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (formMode === 'create') {
      setTasks(prev => [...prev, taskData]);
    } else {
      setTasks(prev => prev.map(task => 
        task.id === taskData.id ? taskData : task
      ));
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff5252';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#ff9800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 300, 
            color: 'text.primary',
            mb: 1
          }}
        >
          Task Manager
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
        >
          Clean and minimalistic task management
        </Typography>
      </Box>

      {/* Active Tasks */}
      <Paper 
        elevation={0} 
        sx={{ 
          mb: 3, 
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '12px',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ p: 3, pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 500, color: 'text.primary' }}>
            Active Tasks ({activeTasks.length})
          </Typography>
        </Box>
        
        {activeTasks.length === 0 ? (
          <Box sx={{ p: 3, pt: 1, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No active tasks. Click the + button to create one!
            </Typography>
          </Box>
        ) : (
          <List sx={{ pt: 0 }}>
            {activeTasks.map((task, index) => (
              <React.Fragment key={task.id}>
                {index > 0 && <Divider />}
                <ListItem sx={{ px: 3, py: 2 }}>
                  <ListItemIcon>
                    <IconButton 
                      edge="start" 
                      onClick={() => handleToggleComplete(task.id)}
                      sx={{ color: 'action.active' }}
                    >
                      <RadioButtonUnchecked />
                    </IconButton>
                  </ListItemIcon>
                  
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {task.title}
                        </Typography>
                        <Box 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            backgroundColor: getPriorityColor(task.priority),
                            flexShrink: 0
                          }} 
                        />
                        {task.dueDate && (
                          <Typography variant="caption" color="text.secondary">
                            Due {formatDate(task.dueDate)}
                          </Typography>
                        )}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        {task.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {task.description}
                          </Typography>
                        )}
                        {task.tags.length > 0 && (
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {task.tags.map((tag, tagIndex) => (
                              <Chip
                                key={tagIndex}
                                label={tag}
                                size="small"
                                sx={{ 
                                  height: 20,
                                  fontSize: '0.75rem',
                                  backgroundColor: 'action.hover',
                                  color: 'text.secondary'
                                }}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    }
                  />
                  
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      onClick={() => handleEditTask(task)}
                      sx={{ mr: 1, color: 'action.active' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      onClick={() => handleDeleteTask(task.id)}
                      sx={{ color: 'action.active' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <Paper 
          elevation={0} 
          sx={{ 
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '12px',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ p: 3, pb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 500, color: 'text.primary' }}>
              Completed ({completedTasks.length})
            </Typography>
          </Box>
          
          <List sx={{ pt: 0 }}>
            {completedTasks.map((task, index) => (
              <React.Fragment key={task.id}>
                {index > 0 && <Divider />}
                <ListItem sx={{ px: 3, py: 2, opacity: 0.7 }}>
                  <ListItemIcon>
                    <IconButton 
                      edge="start" 
                      onClick={() => handleToggleComplete(task.id)}
                      sx={{ color: 'success.main' }}
                    >
                      <CheckCircle />
                    </IconButton>
                  </ListItemIcon>
                  
                  <ListItemText
                    primary={
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          textDecoration: 'line-through',
                          color: 'text.secondary'
                        }}
                      >
                        {task.title}
                      </Typography>
                    }
                  />
                  
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      onClick={() => handleDeleteTask(task.id)}
                      sx={{ color: 'action.active' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          borderRadius: '16px',
          width: 64,
          height: 64
        }}
        onClick={handleCreateTask}
      >
        <AddIcon />
      </Fab>

      {/* Task Form Dialog */}
      <TaskForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
        mode={formMode}
      />
    </Container>
  );
};

export default TaskManager;
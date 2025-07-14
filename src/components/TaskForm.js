import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Typography,
  Divider
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';

const TaskForm = ({ 
  open, 
  onClose, 
  onSave, 
  task = null, 
  mode = 'create' // 'create' or 'edit'
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  // Initialize form with task data when editing
  useEffect(() => {
    if (task && mode === 'edit') {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate || '',
        tags: task.tags || []
      });
    } else {
      // Reset form for new task
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        tags: []
      });
    }
  }, [task, mode, open]);

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && tagInput.trim()) {
      event.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = () => {
    if (formData.title.trim()) {
      onSave({
        ...formData,
        id: task?.id || Date.now(), // Simple ID generation
        createdAt: task?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completed: task?.completed || false
      });
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff5252';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#ff9800';
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          padding: '8px'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        pb: 1
      }}>
        {mode === 'create' ? <AddIcon /> : <EditIcon />}
        <Typography variant="h6" component="span">
          {mode === 'create' ? 'Create New Task' : 'Edit Task'}
        </Typography>
      </DialogTitle>
      
      <Divider sx={{ mx: 3 }} />
      
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Task Title"
            value={formData.title}
            onChange={handleInputChange('title')}
            fullWidth
            variant="outlined"
            required
            autoFocus
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px'
              }
            }}
          />
          
          <TextField
            label="Description"
            value={formData.description}
            onChange={handleInputChange('description')}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px'
              }
            }}
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 120, flex: 1 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={formData.priority}
                onChange={handleInputChange('priority')}
                label="Priority"
                sx={{ borderRadius: '8px' }}
              >
                <MenuItem value="low">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        backgroundColor: getPriorityColor('low') 
                      }} 
                    />
                    Low
                  </Box>
                </MenuItem>
                <MenuItem value="medium">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        backgroundColor: getPriorityColor('medium') 
                      }} 
                    />
                    Medium
                  </Box>
                </MenuItem>
                <MenuItem value="high">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        backgroundColor: getPriorityColor('high') 
                      }} 
                    />
                    High
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={handleInputChange('dueDate')}
              sx={{ 
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px'
                }
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          
          <Box>
            <TextField
              label="Add Tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              fullWidth
              variant="outlined"
              placeholder="Press Enter to add tag"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px'
                }
              }}
            />
            
            {formData.tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {formData.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    size="small"
                    sx={{ 
                      borderRadius: '6px',
                      backgroundColor: '#f5f5f5'
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button 
          onClick={handleClose}
          sx={{ 
            borderRadius: '8px',
            textTransform: 'none',
            color: 'grey.600'
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          variant="contained"
          disabled={!formData.title.trim()}
          sx={{ 
            borderRadius: '8px',
            textTransform: 'none',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }}
        >
          {mode === 'create' ? 'Create Task' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
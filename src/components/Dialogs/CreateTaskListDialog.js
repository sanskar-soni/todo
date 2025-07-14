import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTaskList } from '../../context/TaskListContext';

const colors = [
  '#1976d2', // Blue
  '#388e3c', // Green
  '#f57c00', // Orange
  '#d32f2f', // Red
  '#7b1fa2', // Purple
  '#00796b', // Teal
  '#5d4037', // Brown
  '#455a64', // Blue Grey
];

function CreateTaskListDialog({ open, onClose, folderId }) {
  const { dispatch, folders } = useTaskList();
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const selectedFolder = folders.find(folder => folder.id === folderId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && folderId) {
      dispatch({
        type: 'ADD_TASK_LIST',
        payload: {
          name: name.trim(),
          folderId,
          color: selectedColor,
        },
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setName('');
    setSelectedColor(colors[0]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Create New Task List
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {selectedFolder && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Creating in folder: <strong>{selectedFolder.name}</strong>
            </Typography>
          )}
          
          <TextField
            autoFocus
            margin="dense"
            label="Task List Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 3 }}
          />
          
          <Typography variant="subtitle2" gutterBottom>
            Choose Color
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {colors.map((color) => (
              <Box
                key={color}
                onClick={() => setSelectedColor(color)}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: color,
                  cursor: 'pointer',
                  border: selectedColor === color ? '3px solid #000' : '2px solid transparent',
                  transition: 'border 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              />
            ))}
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={!name.trim()}>
            Create Task List
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CreateTaskListDialog;
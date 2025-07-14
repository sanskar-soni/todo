import React, { useState, useEffect } from 'react';
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

function EditFolderDialog({ open, onClose, folder }) {
  const { dispatch } = useTaskList();
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  useEffect(() => {
    if (folder) {
      setName(folder.name);
      setSelectedColor(folder.color);
    }
  }, [folder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && folder) {
      dispatch({
        type: 'UPDATE_FOLDER',
        payload: {
          id: folder.id,
          name: name.trim(),
          color: selectedColor,
        },
      });
      onClose();
    }
  };

  if (!folder) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Edit Folder
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Folder Name"
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
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={!name.trim()}>
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditFolderDialog;
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  IconButton,
  Alert,
  Typography,
} from '@mui/material';
import { Close, Edit, Delete, Folder } from '@mui/icons-material';
import { useTaskList } from '../../context/TaskListContext';
import EditFolderDialog from './EditFolderDialog';

function FolderMenuDialog({ open, onClose, folder }) {
  const { dispatch, getTaskListsForFolder } = useTaskList();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  if (!folder) return null;

  const folderLists = getTaskListsForFolder(folder.id);
  const hasLists = folderLists.length > 0;

  const handleEdit = () => {
    setEditOpen(true);
    onClose();
  };

  const handleDelete = () => {
    setDeleteConfirm(true);
  };

  const confirmDelete = () => {
    dispatch({ type: 'DELETE_FOLDER', payload: folder.id });
    setDeleteConfirm(false);
    onClose();
  };

  const cancelDelete = () => {
    setDeleteConfirm(false);
  };

  if (deleteConfirm) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Confirm Delete
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            This action cannot be undone!
          </Alert>
          
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete the folder <strong>"{folder.name}"</strong>?
          </Typography>
          
          {hasLists && (
            <Typography variant="body2" color="text.secondary">
              This will also delete {folderLists.length} task list(s) and all their tasks.
            </Typography>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={cancelDelete} color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete Folder
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Folder sx={{ color: folder.color }} />
            {folder.name}
          </span>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 0 }}>
          <List>
            <ListItem button onClick={handleEdit}>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <ListItemText primary="Edit Folder" />
            </ListItem>
            
            {!folder.isDefault && (
              <ListItem button onClick={handleDelete}>
                <ListItemIcon>
                  <Delete color="error" />
                </ListItemIcon>
                <ListItemText 
                  primary="Delete Folder" 
                  primaryTypographyProps={{ color: 'error' }}
                />
              </ListItem>
            )}
          </List>
        </DialogContent>
      </Dialog>

      <EditFolderDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        folder={folder}
      />
    </>
  );
}

export default FolderMenuDialog;
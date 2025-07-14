import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Fab,
  Container,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTaskList } from '../../context/TaskListContext';
import TaskList from '../Tasks/TaskList';
import FolderView from '../Tasks/FolderView';
import AddTaskDialog from '../Dialogs/AddTaskDialog';

function MainContent() {
  const {
    selectedListId,
    selectedFolderId,
    getCurrentList,
    getCurrentFolder,
  } = useTaskList();

  const [addTaskOpen, setAddTaskOpen] = useState(false);

  const currentList = getCurrentList();
  const currentFolder = getCurrentFolder();

  const handleAddTask = () => {
    if (selectedListId) {
      setAddTaskOpen(true);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        backgroundColor: '#fafafa',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {selectedFolderId && currentFolder ? (
          <FolderView folder={currentFolder} />
        ) : selectedListId && currentList ? (
          <>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                border: '1px solid #e0e0e0',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: currentList.color,
                  }}
                />
                <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                  {currentList.name}
                </Typography>
              </Box>
            </Paper>
            
            <TaskList listId={selectedListId} />
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '60vh',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Welcome to Task Manager
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Select a folder or task list from the sidebar to get started
            </Typography>
          </Box>
        )}
      </Container>

      {selectedListId && (
        <Fab
          color="primary"
          aria-label="add task"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
          onClick={handleAddTask}
        >
          <Add />
        </Fab>
      )}

      <AddTaskDialog
        open={addTaskOpen}
        onClose={() => setAddTaskOpen(false)}
        listId={selectedListId}
      />
    </Box>
  );
}

export default MainContent;
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  IconButton,
} from '@mui/material';
import {
  List as ListIcon,
  CheckCircle,
  Schedule,
  MoreVert,
} from '@mui/icons-material';
import { useTaskList } from '../../context/TaskListContext';

function FolderView({ folder }) {
  const {
    getTaskListsForFolder,
    getTasksForList,
    dispatch,
  } = useTaskList();

  const taskLists = getTaskListsForFolder(folder.id);

  const getListStats = (listId) => {
    const tasks = getTasksForList(listId);
    const completed = tasks.filter(task => task.completed).length;
    const total = tasks.length;
    const progress = total > 0 ? (completed / total) * 100 : 0;
    
    return { completed, total, progress };
  };

  const handleSelectList = (listId) => {
    dispatch({ type: 'SET_SELECTED_LIST', payload: listId });
    dispatch({ type: 'SET_SELECTED_FOLDER', payload: null });
  };

  return (
    <Box>
      {/* Folder Header */}
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: folder.color,
            }}
          />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            {folder.name}
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {taskLists.length} task list{taskLists.length !== 1 ? 's' : ''}
        </Typography>
      </Paper>

      {/* Task Lists Grid */}
      {taskLists.length > 0 ? (
        <Grid container spacing={3}>
          {taskLists.map((list) => {
            const stats = getListStats(list.id);
            
            return (
              <Grid item xs={12} sm={6} md={4} key={list.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    },
                  }}
                  onClick={() => handleSelectList(list.id)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                        <ListIcon sx={{ color: list.color, fontSize: 20 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                          {list.name}
                        </Typography>
                      </Box>
                      <IconButton size="small" sx={{ opacity: 0.6 }}>
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {stats.completed}/{stats.total}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={stats.progress}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: list.color,
                            borderRadius: 3,
                          },
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {stats.total > 0 && (
                        <>
                          {stats.completed > 0 && (
                            <Chip
                              icon={<CheckCircle />}
                              label={`${stats.completed} done`}
                              size="small"
                              sx={{
                                backgroundColor: 'success.light',
                                color: 'success.contrastText',
                                fontSize: '0.7rem',
                              }}
                            />
                          )}
                          {stats.total - stats.completed > 0 && (
                            <Chip
                              icon={<Schedule />}
                              label={`${stats.total - stats.completed} pending`}
                              size="small"
                              sx={{
                                backgroundColor: 'warning.light',
                                color: 'warning.contrastText',
                                fontSize: '0.7rem',
                              }}
                            />
                          )}
                        </>
                      )}
                      {stats.total === 0 && (
                        <Chip
                          label="No tasks"
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
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
            No task lists in this folder
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create a new task list using the + button in the sidebar
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default FolderView;
import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Box,
  IconButton,
  Divider,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Folder,
  FolderOpen,
  List as ListIcon,
  ExpandLess,
  ExpandMore,
  Add,
  MoreVert,
  CheckCircle,
} from '@mui/icons-material';
import { useTaskList } from '../../context/TaskListContext';
import CreateFolderDialog from '../Dialogs/CreateFolderDialog';
import CreateTaskListDialog from '../Dialogs/CreateTaskListDialog';
import FolderMenuDialog from '../Dialogs/FolderMenuDialog';

const SIDEBAR_WIDTH = 280;

function Sidebar() {
  const {
    folders,
    taskLists,
    selectedListId,
    selectedFolderId,
    dispatch,
    getTaskListsForFolder,
    getTasksForList,
  } = useTaskList();

  const [expandedFolders, setExpandedFolders] = useState(['1', '2']);
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [createListOpen, setCreateListOpen] = useState(false);
  const [selectedFolderForList, setSelectedFolderForList] = useState(null);
  const [folderMenuOpen, setFolderMenuOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleFolderToggle = (folderId) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const handleListSelect = (listId) => {
    dispatch({ type: 'SET_SELECTED_LIST', payload: listId });
    dispatch({ type: 'SET_SELECTED_FOLDER', payload: null });
  };

  const handleFolderSelect = (folderId) => {
    dispatch({ type: 'SET_SELECTED_FOLDER', payload: folderId });
    dispatch({ type: 'SET_SELECTED_LIST', payload: null });
  };

  const handleAddList = (folderId) => {
    setSelectedFolderForList(folderId);
    setCreateListOpen(true);
  };

  const handleFolderMenu = (folder, event) => {
    event.stopPropagation();
    setSelectedFolder(folder);
    setFolderMenuOpen(true);
  };

  const getCompletedTasksCount = (listId) => {
    const tasks = getTasksForList(listId);
    return tasks.filter(task => task.completed).length;
  };

  const getTotalTasksCount = (listId) => {
    return getTasksForList(listId).length;
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: '#fafafa',
            borderRight: '1px solid #e0e0e0',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Task Manager
          </Typography>
        </Box>
        
        <Divider />
        
        <Box sx={{ p: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, py: 1 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
              Folders
            </Typography>
            <Tooltip title="Create Folder">
              <IconButton 
                size="small" 
                onClick={() => setCreateFolderOpen(true)}
                sx={{ color: 'text.secondary' }}
              >
                <Add fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          
          <List dense>
            {folders.map((folder) => {
              const folderLists = getTaskListsForFolder(folder.id);
              const isExpanded = expandedFolders.includes(folder.id);
              const isSelected = selectedFolderId === folder.id;
              
              return (
                <React.Fragment key={folder.id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleFolderSelect(folder.id)}
                      selected={isSelected}
                      sx={{
                        borderRadius: 1,
                        mx: 0.5,
                        '&.Mui-selected': {
                          backgroundColor: `${folder.color}20`,
                          '&:hover': {
                            backgroundColor: `${folder.color}30`,
                          },
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {isExpanded ? (
                          <FolderOpen sx={{ color: folder.color, fontSize: 20 }} />
                        ) : (
                          <Folder sx={{ color: folder.color, fontSize: 20 }} />
                        )}
                      </ListItemIcon>
                      <ListItemText 
                        primary={folder.name}
                        primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => handleFolderToggle(folder.id)}
                        sx={{ mr: 1 }}
                      >
                        {isExpanded ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                      {!folder.isDefault && (
                        <IconButton
                          size="small"
                          onClick={(e) => handleFolderMenu(folder, e)}
                        >
                          <MoreVert fontSize="small" />
                        </IconButton>
                      )}
                    </ListItemButton>
                  </ListItem>
                  
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {folderLists.map((list) => {
                        const isListSelected = selectedListId === list.id;
                        const completedCount = getCompletedTasksCount(list.id);
                        const totalCount = getTotalTasksCount(list.id);
                        
                        return (
                          <ListItem key={list.id} disablePadding sx={{ pl: 2 }}>
                            <ListItemButton
                              onClick={() => handleListSelect(list.id)}
                              selected={isListSelected}
                              sx={{
                                borderRadius: 1,
                                mx: 0.5,
                                '&.Mui-selected': {
                                  backgroundColor: `${list.color}20`,
                                  '&:hover': {
                                    backgroundColor: `${list.color}30`,
                                  },
                                },
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <ListIcon sx={{ color: list.color, fontSize: 18 }} />
                              </ListItemIcon>
                              <ListItemText 
                                primary={list.name}
                                primaryTypographyProps={{ fontSize: '0.8rem' }}
                              />
                              {totalCount > 0 && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  {completedCount === totalCount && (
                                    <CheckCircle sx={{ color: 'success.main', fontSize: 16 }} />
                                  )}
                                  <Chip
                                    label={`${completedCount}/${totalCount}`}
                                    size="small"
                                    sx={{
                                      height: 20,
                                      fontSize: '0.7rem',
                                      backgroundColor: completedCount === totalCount ? 'success.light' : 'grey.200',
                                      color: completedCount === totalCount ? 'success.contrastText' : 'text.secondary',
                                    }}
                                  />
                                </Box>
                              )}
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                      
                      <ListItem disablePadding sx={{ pl: 2 }}>
                        <ListItemButton
                          onClick={() => handleAddList(folder.id)}
                          sx={{
                            borderRadius: 1,
                            mx: 0.5,
                            opacity: 0.7,
                            '&:hover': { opacity: 1 },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Add sx={{ color: 'text.secondary', fontSize: 18 }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Add List"
                            primaryTypographyProps={{ 
                              fontSize: '0.8rem',
                              color: 'text.secondary',
                              fontStyle: 'italic'
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <CreateFolderDialog
        open={createFolderOpen}
        onClose={() => setCreateFolderOpen(false)}
      />
      
      <CreateTaskListDialog
        open={createListOpen}
        onClose={() => setCreateListOpen(false)}
        folderId={selectedFolderForList}
      />
      
      <FolderMenuDialog
        open={folderMenuOpen}
        onClose={() => setFolderMenuOpen(false)}
        folder={selectedFolder}
      />
    </>
  );
}

export default Sidebar;
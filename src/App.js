import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import './App.css';
import Sidebar from './components/Navigation/Sidebar';
import MainContent from './components/Layout/MainContent';
import { TaskListProvider } from './context/TaskListContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaskListProvider>
        <Box sx={{ display: 'flex', height: '100vh' }}>
          <Sidebar />
          <MainContent />
        </Box>
      </TaskListProvider>
    </ThemeProvider>
  );
}

export default App;

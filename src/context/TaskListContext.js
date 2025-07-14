import React, { createContext, useContext, useReducer, useEffect } from 'react';

const TaskListContext = createContext();

const initialState = {
  folders: [
    {
      id: '1',
      name: 'Personal',
      color: '#1976d2',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Work',
      color: '#388e3c',
      isDefault: false,
    },
  ],
  taskLists: [
    {
      id: '1',
      name: "Today's Tasks",
      folderId: '1',
      color: '#1976d2',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Shopping List',
      folderId: '1',
      color: '#f57c00',
      isDefault: false,
    },
    {
      id: '3',
      name: 'Project Alpha',
      folderId: '2',
      color: '#388e3c',
      isDefault: false,
    },
  ],
  tasks: [
    {
      id: '1',
      title: 'Buy groceries',
      description: 'Milk, eggs, bread',
      completed: false,
      listId: '1',
      createdAt: new Date().toISOString(),
      dueDate: null,
    },
    {
      id: '2',
      title: 'Call dentist',
      description: 'Schedule appointment',
      completed: false,
      listId: '1',
      createdAt: new Date().toISOString(),
      dueDate: null,
    },
    {
      id: '3',
      title: 'Review code',
      description: 'Check pull requests',
      completed: true,
      listId: '3',
      createdAt: new Date().toISOString(),
      dueDate: null,
    },
  ],
  selectedListId: '1',
  selectedFolderId: null,
};

function taskListReducer(state, action) {
  switch (action.type) {
    case 'SET_SELECTED_LIST':
      return { ...state, selectedListId: action.payload };
    
    case 'SET_SELECTED_FOLDER':
      return { ...state, selectedFolderId: action.payload };
    
    case 'ADD_FOLDER':
      const newFolder = {
        id: Date.now().toString(),
        name: action.payload.name,
        color: action.payload.color || '#1976d2',
        isDefault: false,
      };
      return { ...state, folders: [...state.folders, newFolder] };
    
    case 'UPDATE_FOLDER':
      return {
        ...state,
        folders: state.folders.map(folder =>
          folder.id === action.payload.id ? { ...folder, ...action.payload } : folder
        ),
      };
    
    case 'DELETE_FOLDER':
      return {
        ...state,
        folders: state.folders.filter(folder => folder.id !== action.payload),
        taskLists: state.taskLists.filter(list => list.folderId !== action.payload),
        tasks: state.tasks.filter(task => {
          const taskList = state.taskLists.find(list => list.id === task.listId);
          return taskList ? taskList.folderId !== action.payload : true;
        }),
      };
    
    case 'ADD_TASK_LIST':
      const newTaskList = {
        id: Date.now().toString(),
        name: action.payload.name,
        folderId: action.payload.folderId,
        color: action.payload.color || '#1976d2',
        isDefault: false,
      };
      return { ...state, taskLists: [...state.taskLists, newTaskList] };
    
    case 'UPDATE_TASK_LIST':
      return {
        ...state,
        taskLists: state.taskLists.map(list =>
          list.id === action.payload.id ? { ...list, ...action.payload } : list
        ),
      };
    
    case 'DELETE_TASK_LIST':
      return {
        ...state,
        taskLists: state.taskLists.filter(list => list.id !== action.payload),
        tasks: state.tasks.filter(task => task.listId !== action.payload),
        selectedListId: state.selectedListId === action.payload ? state.taskLists[0]?.id : state.selectedListId,
      };
    
    case 'ADD_TASK':
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description || '',
        completed: false,
        listId: action.payload.listId,
        createdAt: new Date().toISOString(),
        dueDate: action.payload.dueDate || null,
      };
      return { ...state, tasks: [...state.tasks, newTask] };
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
}

export function TaskListProvider({ children }) {
  const [state, dispatch] = useReducer(taskListReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('taskListData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('taskListData', JSON.stringify(state));
  }, [state]);

  const contextValue = {
    ...state,
    dispatch,
    // Helper functions
    getTasksForList: (listId) => state.tasks.filter(task => task.listId === listId),
    getTaskListsForFolder: (folderId) => state.taskLists.filter(list => list.folderId === folderId),
    getCurrentFolder: () => {
      if (state.selectedFolderId) {
        return state.folders.find(folder => folder.id === state.selectedFolderId);
      }
      const currentList = state.taskLists.find(list => list.id === state.selectedListId);
      return currentList ? state.folders.find(folder => folder.id === currentList.folderId) : null;
    },
    getCurrentList: () => state.taskLists.find(list => list.id === state.selectedListId),
  };

  return (
    <TaskListContext.Provider value={contextValue}>
      {children}
    </TaskListContext.Provider>
  );
}

export function useTaskList() {
  const context = useContext(TaskListContext);
  if (!context) {
    throw new Error('useTaskList must be used within a TaskListProvider');
  }
  return context;
}
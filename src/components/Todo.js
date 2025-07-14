import { React, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TodoList from "./TodoList";

const Todo = (props) => {
  const [activeTasks] = useState([
    { id: 0, text: "Complete project documentation" },
    { id: 1, text: "Review code changes" },
    { id: 2, text: "Schedule team meeting" }
  ]);

  const [inactiveTasks] = useState([
    { id: 3, text: "Update dependencies" },
    { id: 4, text: "Write unit tests" },
    { id: 5, text: "Deploy to staging" }
  ]);

  return (
    <div>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "yellow", p: 2, textAlign: 'center' }}>
          <Typography variant="h4" component="h1">
            To Do App
          </Typography>
        </Box>
        <Box sx={{ bgcolor: "#cfe8fc", height: "40vh", p: 1 }}>
          <Typography variant="h6" sx={{ p: 1 }}>Active Tasks</Typography>
          <TodoList list={activeTasks} active></TodoList>
        </Box>
        <Box sx={{ bgcolor: "grey", height: "40vh", p: 1 }}>
          <Typography variant="h6" sx={{ p: 1, color: 'white' }}>Inactive Tasks</Typography>
          <TodoList list={inactiveTasks} active={false}></TodoList>
        </Box>
      </Container>
    </div>
  );
};
export default Todo;

import { React } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TodoList from "./TodoList";

const Todo = (props) => {
  return (
    <div>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "yellow" }}>To Do</Box>
        <Box sx={{ bgcolor: "#cfe8fc", height: "40vh" }}>
          <TodoList list={[0, 1, 2]} active></TodoList>
        </Box>
        <Box sx={{ bgcolor: "grey", height: "40vh" }}>
          <TodoList list={[3, 4, 5]} active={false}></TodoList>
        </Box>
      </Container>
    </div>
  );
};
export default Todo;

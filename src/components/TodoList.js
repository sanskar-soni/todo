import { React, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";

const TodoList = (props) => {
  console.log(props);
  const list = props.list;
  const [completed, setCompleted] = useState(new Set());

  const handleToggle = (taskId) => () => {
    const newCompleted = new Set(completed);
    if (completed.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompleted(newCompleted);
  };

  const isCompleted = (taskId) => completed.has(taskId);

  return (
    <div>
      <List dense={false}>
        {list.map((task) => {
          const labelId = `checkbox-list-label-${task.id}`;
          const taskCompleted = isCompleted(task.id);
          
          return (
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
              key={task.id}
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(task.id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={taskCompleted}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText 
                  id={labelId} 
                  primary={task.text}
                  sx={{
                    textDecoration: taskCompleted ? 'line-through' : 'none',
                    opacity: taskCompleted ? 0.6 : 1,
                    color: taskCompleted ? 'text.disabled' : 'text.primary',
                    transition: 'all 0.3s ease-in-out'
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default TodoList;

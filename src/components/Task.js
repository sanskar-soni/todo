import { React } from "react";
import Typography from "@mui/material/Typography";

const Task = (props) => {
  console.log(props);
  return (
    <div>
      <Typography variant="h1" gutterBottom>
        ToDo
      </Typography>
    </div>
  );
};

export default Task;

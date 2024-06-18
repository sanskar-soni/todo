import { React } from "react";

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

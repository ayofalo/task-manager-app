import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";

import {
  TextField,
  Container,
  List,
  ListItem,
  Checkbox,
  Typography,
  Button,
} from "@mui/material";
import styles from "./todoList.module.scss";
import { TodoType } from "../../types";
import useTodoList from "../../hooks/useTodolist";
import { httpCreateTasks, httpUpdateStatus } from "../../hooks/request";

const TodoList: React.FC = () => {
  const { data, loading, error, refreshData } = useTodoList();
  const [err, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const [inputVal, setInputVal] = useState<string>("");
  const [isEdited, setIsEdited] = useState(false);

  const [editedId, setEditedId] = useState<number>(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const handleClick = async () => {
    if (!isEdited) {
      const data = {
        task: inputVal,
        completed: false,
      };
      httpCreateTasks(data);
    } else if (isEdited) {
      const data = {
        task: inputVal,
        completed: false,
        taskNumber: editedId,
      };
      handleEdit(data);
    }
    setInputVal("");
    setIsEdited(false);
  };

  useEffect(() => {
    // Call refreshData whenever data changes
    refreshData();
  }, [isEdited]); // Add other dependencies as needed
  const handleDone = async (id: number, status: boolean) => {
    try {
      const data = {
        completed: status,
      };
      const response = await axios.put(
        `http://localhost:3001/api/tasks/${id}`,
        data
      );
    } catch (error) {
      // setError("Something went wrong while fetching data.");
    }
    refreshData();
  };
  const handleEdit = async (data: TodoType) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/tasks/${data.taskNumber}`,
        data
      );
      // setData(response.data);
      // setLoading(false);
    } catch (error) {
      setError("Something went wrong while fetching data.");
      // setLoading(false);
    }
  };
  const handleEdite = async (todo: TodoType) => {
    setInputVal(todo.task);
    setEditedId(todo.taskNumber);
    setIsEdited(true);
  };
  const onDelete = async (id: Number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/tasks/${id}`
      );
      // setData(response.data);
      // setLoading(false);
    } catch (error) {
      setError("Something went wrong while fetching data.");
      // setLoading(false);
    }
    refreshData();
  };

  return (
    <Container component="main" className={styles.container}>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          id="Add task"
          label="Add-Task"
          variant="outlined"
          onChange={onChange}
          className={styles.input}
          value={inputVal}
        />
        <Button
          variant={isEdited ? "outlined" : "contained"}
          size="large"
          disabled={inputVal ? false : true}
          className={styles.addButton}
          onClick={handleClick}
        >
          {" "}
          {isEdited ? "Edit Task" : "Add Task"}
        </Button>
      </Box>
      <List>
        {data.map((todo: TodoType, index) => {
          return (
            <ListItem key={todo.taskNumber} divider className={styles.list}>
              <Checkbox
                onClick={() => handleDone(todo.taskNumber, !todo.completed)}
                checked={todo.completed}
              />
              <Typography
                className={styles.text}
                style={{ color: todo.completed ? "green" : "" }}
              >
                {todo.task}
              </Typography>
              <Button
                onClick={() => handleEdite(todo)}
                variant="contained"
                className={styles.listButtons}
              >
                Edit
              </Button>
              <Button
                onClick={() => onDelete(todo.taskNumber)}
                color="secondary"
                variant="contained"
                className={styles.listButtons}
              >
                delete
              </Button>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default TodoList;

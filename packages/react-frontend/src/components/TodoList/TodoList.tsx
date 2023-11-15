import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

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
import {
  httpCreateTasks,
  httpUpdateStatus,
  httpDeleteTasks,
} from "../../hooks/request";

const TodoList: React.FC = () => {
  const { data, loading, error, refreshData } = useTodoList();
  const [isLoading, setIsLoading] = useState(false);
  const [inputVal, setInputVal] = useState<string>("");
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState<number>(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const handleClick = async () => {
    try {
      if (!isEdited) {
        const data = {
          task: inputVal,
          completed: false,
        };
        await httpCreateTasks(data);
      } else if (isEdited) {
        const data = {
          task: inputVal,
          completed: false,
          taskNumber: editedId,
        };
        await handleEdit(data);
      }
      setInputVal("");
      setIsEdited(false);
      refreshData();
    } catch (error) {
      // Handle errors
      console.error("Error during handleClick:", error);
      window.alert("Task creation/edit failed. Please try again.");
    }
  };
  const handleDone = async (id: number, status: boolean) => {
    try {
      const data = {
        completed: status,
      };
      await httpUpdateStatus(id, data, setIsLoading);

      refreshData();
    } catch (error) {
      console.error("Error during handleClick:", error);
      window.alert(" Status edit failed. Please try again.");
    }
  };
  const handleEdit = async (data: TodoType) => {
    try {
      await httpUpdateStatus(data.taskNumber, data, setIsLoading);
      refreshData();
    } catch (error) {
      console.error("Error during handleClick:", error);
      window.alert("Task edit failed. Please try again.");
    }
  };

  const handleEdite = async (todo: TodoType) => {
    setInputVal(todo.task);
    setEditedId(todo.taskNumber);
    setIsEdited(true);
  };
  const onDelete = async (id: number) => {
    try {
      await httpDeleteTasks(id);
      refreshData();
    } catch (error) {
      console.error("Error during delete:", error);
      window.alert("Task delete failed. Please try again.");
    }
  };
  const memoizedRefreshData = useCallback(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    memoizedRefreshData();
  }, [isEdited, memoizedRefreshData]);

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
      {error && (
        <div style={{ marginTop: "50px", color: "red" }}>
          Error Fetching Data
        </div>
      )}
      {isLoading && (
        <div style={{ marginTop: "50px", color: "red" }}>Loading Data</div>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {data.map((todo: TodoType, index) => {
            return (
              <ListItem key={todo.taskNumber} divider className={styles.list}>
                <Checkbox
                  key={todo.taskNumber}
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
      )}
    </Container>
  );
};
export default TodoList;

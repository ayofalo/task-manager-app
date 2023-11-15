import { useEffect, useState } from "react";
import { TodoType } from "../types";
import { httpGetTasks } from "./request";

function useTodoList() {
  const [data, setData] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    httpGetTasks(setData, setLoading, setError);

    //once request is successful, error should be false
  }, []);

  // useEffect(() => {
  //   console.log(`hey ${error}`);
  // }, [error]);

  const refreshData = () => {
    httpGetTasks(setData, setLoading, setError);
  };

  return { data, loading, error, refreshData };
}

export default useTodoList;

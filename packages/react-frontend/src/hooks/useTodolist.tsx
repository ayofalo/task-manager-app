import { useEffect, useState } from "react";
import { TodoType } from "../types";
import { httpGetTasks } from "./request";

function useTodoList() {
  const [data, setData] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    httpGetTasks(setData, setLoading);
  }, []);

  const refreshData = () => {
    httpGetTasks(setData, setLoading);
  };

  return { data, loading, error, refreshData };
}

export default useTodoList;

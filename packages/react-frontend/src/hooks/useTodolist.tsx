import { useEffect, useState } from "react";
import axios from "axios";
import { TodoType } from "../types";

function useTodoList() {
  const [data, setData] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/tasks/`);
      setData((prevData) => {
        // Only update if the data has changed
        if (JSON.stringify(prevData) !== JSON.stringify(response.data)) {
          return response.data;
        }
        return prevData;
      });
      setLoading(false);
    } catch (error) {
      setError("Something went wrong while fetching data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    fetchData();
  };

  return { data, loading, error, refreshData };
}

export default useTodoList;

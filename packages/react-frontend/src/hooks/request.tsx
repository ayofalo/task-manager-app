import { TodoType } from "../types";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001";

type SetDataFunction = Dispatch<SetStateAction<TodoType[]>>;

async function httpGetTasks(
  setData: SetDataFunction,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>
) {
  try {
    const startTime = Date.now();
    const response = await axios.get(`${API_URL}/api/tasks/`);
    setData(response.data);

    const elapsedTime = Date.now() - startTime; // Calculate elapsed time

    // If the request takes more than 1 minute, show loading
    if (elapsedTime > 60000) {
      setLoading(true);
    }
  } catch (error) {
    console.error("Error during fetching:", error);
    setError(`${error}`); // Set the error state with the error message
  } finally {
    setLoading(false);
  }
}

async function httpCreateTasks(data: {}) {
  try {
    const response = await axios.post(` ${API_URL}/api/tasks/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    throw error;
  }
}

async function httpUpdateStatus(
  id: number,
  data: {},
  setIsLoading: (isLoading: boolean) => void
) {
  try {
    setIsLoading(true);

    const response = await axios.put(`${API_URL}/api/tasks/${id}`, data);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
}

async function httpDeleteTasks(id: number) {
  try {
    await axios.delete(`${API_URL}/api/tasks/${id}`);
  } catch (error) {
    throw error;
  }
}
export { httpGetTasks, httpCreateTasks, httpUpdateStatus, httpDeleteTasks };

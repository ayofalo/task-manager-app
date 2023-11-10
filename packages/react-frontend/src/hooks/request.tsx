import { TodoType } from "../types";
import axios from "axios";

const API_URL = "http://localhost:3001";

async function httpCreateTasks(data: {}) {
  try {
    const response = await fetch(`${API_URL}/tasks/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Handle non-successful response (HTTP error)
      return {
        ok: false,
        status: response.status,
        statusText: response.statusText,
      };
    }

    // Parse the response body as JSON, assuming it's JSON data
    const responseData = await response.json();

    return {
      ok: true,
      data: responseData,
    };
  } catch (err) {
    // Handle other errors (e.g., network issues)
    console.error("Error during HTTP request:", err);

    return {
      ok: false,
      error: "Network error",
    };
  }
}

async function httpUpdateStatus(id: number, status: boolean) {
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
}

export { httpCreateTasks, httpUpdateStatus };

// TodoList.test.tsx

import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import TodoList from "../../components/TodoList/TodoList"; // Update with your actual component path

jest.mock("axios");

describe("TodoList Component", () => {
  const mockData = [
    { taskNumber: 1, task: "Task 1", completed: false },
    { taskNumber: 2, task: "Task 2", completed: true },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: mockData });
  });

  it("renders TodoList component correctly", async () => {
    render(<TodoList />);
    expect(screen.getByLabelText("Add-Task")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
    });
  });
});

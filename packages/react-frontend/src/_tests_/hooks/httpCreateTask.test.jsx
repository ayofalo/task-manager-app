// httpCreateTasks.test.ts

import { httpCreateTasks } from "../../hooks/request"; // Update with your actual module path
import axios from "axios";
jest.mock("axios");

describe("httpCreateTasks", () => {
  it("creates tasks successfully", async () => {
    const mockData = {
      task: "Test",
      completed: false,
    };
    axios.post.mockResolvedValueOnce({ data: mockData });

    const response = await httpCreateTasks(mockData);

    expect(response.ok).toBe(true);
    expect(response.data).toEqual(mockData);
  });
});

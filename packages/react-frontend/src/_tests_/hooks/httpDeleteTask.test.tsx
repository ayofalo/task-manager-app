import axios from "axios";
import { httpDeleteTasks } from "../../hooks/request"; // Update with your actual module path

jest.mock("axios");

describe("httpDeleteTasks", () => {
  it("deletes tasks successfully", async () => {
    (axios.delete as jest.Mock).mockResolvedValueOnce({});

    await expect(httpDeleteTasks(1)).resolves.not.toThrow();
  });
});

// httpGetTasks.test.ts

import { render, waitFor, act } from "@testing-library/react";
import axios from "axios";
import { httpGetTasks } from "../../hooks/request"; // Update with your actual module path

jest.mock("axios");

describe("httpGetTasks", () => {
  it("fetches successfully data from an API and updates state", async () => {
    const mockData = [
      {
        /* your mock data here */
      },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData });

    const setDataMock = jest.fn();
    const setLoadingMock = jest.fn();

    await act(async () => {
      await httpGetTasks(setDataMock, setLoadingMock);
    });

    expect(setDataMock).toHaveBeenCalledWith(mockData);
    expect(setLoadingMock).toHaveBeenCalledWith(false);
  });
});

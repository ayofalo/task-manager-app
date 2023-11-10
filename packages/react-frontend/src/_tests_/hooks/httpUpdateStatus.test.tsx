import axios, { AxiosResponse } from "axios";
import { httpUpdateStatus } from "../../hooks/request";

jest.mock("axios");

describe("httpUpdateStatus", () => {
  it("updates task status successfully", async () => {
    const mockData = {
      task: "Test",
      completed: false,
    };

    const axiosMock = axios as jest.Mocked<typeof axios>;
    axiosMock.put.mockResolvedValueOnce({ data: mockData } as AxiosResponse);

    const setIsLoadingMock = jest.fn();
    const response = await httpUpdateStatus(1, mockData, setIsLoadingMock);

    expect(setIsLoadingMock).toHaveBeenCalledWith(true);
    expect(setIsLoadingMock).toHaveBeenCalledWith(false);
    expect(response.ok).toBe(true);
    expect(response.data).toEqual(mockData);
  });
});

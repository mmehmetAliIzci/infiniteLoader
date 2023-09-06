import { throttle } from "./throttle";

describe("throttle", () => {
  it("should call the function immediately", () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 1000);
    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should not call the function again within the delay period", () => {
    jest.useFakeTimers();
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 1000);
    throttledFn();
    throttledFn();
    throttledFn();
    jest.advanceTimersByTime(900);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should call the function again after the delay period", () => {
    jest.useFakeTimers();
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 1000);
    throttledFn();
    jest.advanceTimersByTime(1000);
    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});

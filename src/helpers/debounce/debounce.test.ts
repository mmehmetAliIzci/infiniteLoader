import { debounce } from '.';

describe('debounce function', () => {
  let func: jest.Mock;
  let debouncedFunc: Function;

  beforeEach(() => {
    func = jest.fn();
    debouncedFunc = debounce(func, 1000);
    jest.useFakeTimers();
  });

  it('should execute the function only once', () => {
    for (let i = 0; i < 100; i++) {
      debouncedFunc();
    }

    jest.runAllTimers();

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should pass the latest arguments to the function', () => {
    debouncedFunc('a');
    debouncedFunc('b');
    debouncedFunc('c');

    jest.runAllTimers();

    expect(func).toHaveBeenCalledWith('c');
  });

  it('should not execute the function if time has not elapsed', () => {
    debouncedFunc();
    jest.advanceTimersByTime(500);

    expect(func).not.toHaveBeenCalled();
  });

  it('should execute the function after the delay time has elapsed', () => {
    debouncedFunc();
    jest.advanceTimersByTime(1000);

    expect(func).toHaveBeenCalledTimes(1);
  });
});

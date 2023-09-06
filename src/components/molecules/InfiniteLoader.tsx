import React, { useState, useEffect, useCallback, useRef } from "react";
import { throttle } from "../../helpers/throttle/throttle";

interface InfiniteLoaderProps<T> {
  fetchData: (page: number) => Promise<T[]>;
  renderItem: (item: T) => React.ReactNode;
  throttleTime?: number;
  containerHeight?: string;
  loaderHeight?: string;
  initialPage?: number;
}

const InfiniteLoader = <T,>({
  fetchData,
  renderItem,
  containerHeight = "500px",
  loaderHeight = "50px",
  throttleTime = 500,
  initialPage = 1,
}: InfiniteLoaderProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);
  const loaderRef = useRef(null);

  const fetchThrottled = throttle(async () => {
    try {
      const newData = await fetchData(page);
      setData((prevData) => [...prevData, ...newData]);
      setPage(page + 1);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.warn(error);
    }
  }, throttleTime);

  const loadMore = () => {
    if (isLoading) return;
    setIsLoading(true);
    fetchThrottled();
  };

  const throttledLoadMore = useCallback(loadMore, [
    page,
    isLoading,
    fetchData,
    fetchThrottled,
  ]);

  useEffect(() => {
    const currentLoaderRef = loaderRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          throttledLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [throttledLoadMore]);

  return (
    <div style={{ height: containerHeight, overflow: "auto" }}>
      {data.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
      {isLoading && <div>Loading...</div>}
      {error && <div>Something wrong fetching characters...</div>}
      <div
        ref={loaderRef}
        style={{ height: loaderHeight, backgroundColor: "transparent" }}
      ></div>
    </div>
  );
};

export default InfiniteLoader;

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { debounce } from "../../helpers/debounce";

interface InfiniteLoaderProps<T> {
  fetchNextPage: () => Promise<T[]>;
  renderItem: (item: T) => React.ReactNode;
  debounceTime?: number;
  containerHeight?: string;
  loaderHeight?: string;
}

const InfiniteLoader = <T,>({
  fetchNextPage,
  renderItem,
  containerHeight = "500px",
  loaderHeight = "50px",
  debounceTime = 500,
}: InfiniteLoaderProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchDebounced = debounce(async () => {
    try {
      const newData = await fetchNextPage();
      if (newData.length === 0) {
        setHasMore(false);
      }
      setData((prevData) => [...prevData, ...newData]);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.warn(error);
    }
  }, debounceTime);

  const loadMore = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    fetchDebounced();
  }, [isLoading, fetchNextPage, fetchDebounced]);

  useEffect(() => {
    const currentLoaderRef = loaderRef.current;

    const observerCallback = ([entry]: IntersectionObserverEntry[]) => {
      console.log("Observer callback fired", entry); // Debug line

      if (entry.isIntersecting) {
        loadMore();
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });

    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
      console.log("Observer set"); // Debug line
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, []);

  const memoizedItem = useMemo(() => renderItem, [renderItem]);

  return (
    <div style={{ height: containerHeight, overflow: "auto" }}>
      {data.map((item, index) => (
        <div key={index}>{memoizedItem(item)}</div>
      ))}
      {hasMore ? (
        <>
          {isLoading && <div>Loading...</div>}
          {error && <div>Something wrong loading more...</div>}
          <button onClick={loadMore}>Load More</button>
        </>
      ) : (
        <div>You've reached the end of the internet</div>
      )}

      <div
        ref={loaderRef}
        style={{ height: loaderHeight, backgroundColor: "transparent" }}
      ></div>
    </div>
  );
};

export default InfiniteLoader;

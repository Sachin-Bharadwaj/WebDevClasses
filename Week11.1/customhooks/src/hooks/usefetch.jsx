import { useState, useEffect } from "react";

// custom hook
export function useFetch(url) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true);
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [url]);

  // logic to keep fetching data from server at some fixed interval
  {
    /* 
  useEffect(() => {
    const interval = setInterval(getData, 10000);
    return () => clearInterval(interval);
  }, []);
  */
  }

  return {
    data: data,
    loading: loading,
  };
}

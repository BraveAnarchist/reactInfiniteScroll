import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import "./App.css";
import Item from "./Item.jsx";

export default function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const loadingRef = useRef(false);
  const prevUrl = useRef("hitler");

  function handleInput(e) {
    setInput(e.target.value);
  }

  const handleSearch = () => {
    if (input.length > 2) {
      setPage(1);
      fetchData(input, 1);
      setInput("");
    }
  };

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loadingRef.current) {
      setPage((prevPage) => prevPage + 1);
      console.log("scroll");
    }
  }, []);

  const fetchData = async (url, page) => {
    try {
      loadingRef.current = true;
      console.log(url);
      const response = await fetch(`https://api.unsplash.com/search/photos?client_id=GVpni9mde9_fzfhEEoCPSUL-upeOponQgTv1M-mTGzE&query=${url}&page=${page}`);
      const result = await response.json();
      if (page > 1) {
        setData((prevData) => [...prevData, ...result.results]);
      } else {
        setData(result.results);
      }
      console.log("here");
      prevUrl.current = url;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    fetchData(prevUrl.current, page);
  }, [page]);

  useEffect(() => {
    const onScroll = () => {
      handleScroll();
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  useEffect(() => {
    fetchData("orange", 1);
  }, []);

  return (
    <div>
      <main className="flex justify-between mt-[3vh] mx-[1vw]">
        <h1>GeekGallery</h1>
        <div>
          <input
            value={input}
            onChange={handleInput}
            className="border-[3px]"
            type="text"
          />
          <button
            onClick={handleSearch}
            className="text-[#6cb192] border border-[#6cb192] hover:bg-[#6cb192] hover:text-white"
          >
            Search
          </button>
        </div>
      </main>
      <Item data={data} />
    </div>
  );
}

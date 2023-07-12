"use client";

import { useState, useEffect, Suspense } from "react";
import Card from "./Card";
import CardSkeleton from "@components/CardLoader";

const CardList = ({ data, handleTagClick }) => {
  // console.log(data);
  if (data.length === 0) {
    return (
      <div className="mt-16 prompt_layout">
        {Array.from({ length: 9 }, (_, i) => i + 1).map(() => (
          <CardSkeleton />
        ))}
      </div>
    );
  }
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <Card key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

export const Feed = () => {
  const [searchQ, setSearchQ] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/snippet");
      await new Promise((resolve) => setTimeout(resolve, 500));
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) => regex.test(item.creator.username) || regex.test(item.tags)
    );
  };

  const handleSearchChanges = (e) => {
    clearTimeout(searchTimeout);
    setSearchQ(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    clearTimeout(searchTimeout);
    setSearchQ(tag);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(tag);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchQ}
          onChange={handleSearchChanges}
          required
          className="w-3/4 sm:w-3/5 py-2.5 px-4 mt-[-30px] h-[2.9rem] mb-[-50px] border-blue-500 shadow-md rounded-md text-blue-600 focus:border-none focus:outline-none"
        />
      </form>

      {searchQ ? (
        <CardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <CardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

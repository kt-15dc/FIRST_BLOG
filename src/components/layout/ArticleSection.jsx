import { useState, useEffect } from "react";
import { BlogCard } from "./BlogCard";
import axios from "axios";

export const ArticleSection = ({ fetchData }) => {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const [activeCategory, setActiveCategory] = useState("Highlight");

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // ✅ เพิ่ม State

  useEffect(() => {
    setPage(1);
    setPosts([]);
    setHasMore(true);
  }, [activeCategory]);

  useEffect(() => {
    fetchPosts();
  }, [page, activeCategory]);

  const fetchPosts = async () => {
    setIsLoading(true); // ✅ เริ่มโหลดข้อมูล
    try {
      const categoryParam = activeCategory === "Highlight" ? "" : activeCategory;
      const response = await axios.get("https://blog-post-project-api.vercel.app/posts", {
        params: {
          page: page,
          limit: 6,
          category: categoryParam
        }
      });

      if (activeCategory === "Highlight" && page === 1) {
        setPosts(response.data.posts.slice(0, 6));
      } else {
        setPosts((prev) => [...prev, ...response.data.posts]);
      }

      if (response.data.currentPage >= response.data.totalPages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false); // ✅ โหลดเสร็จ
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="w-full flex flex-col items-center sm:px-20 px-5">
      <div className="bg-[#F4F2EE] p-4 rounded-lg w-full max-w-full lg:max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Desktop category buttons */}
          <div className="hidden md:flex gap-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeCategory === category
                    ? "bg-[#DEDAD3] text-black font-bold"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-3 pr-10 bg-white border rounded-lg text-gray-600 focus:outline-none"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 19l-4-4m0-7a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Mobile category dropdown */}
          <div className="w-full md:hidden">
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <div className="relative">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white border rounded-lg text-gray-600 focus:outline-none appearance-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-full lg:max-w-7xl mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              image={post.image}
              category={post.category}
              title={post.title}
              description={post.description}
              author={post.author}
              date={new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            />
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              disabled={isLoading} // ปิดปุ่มระหว่างโหลด
              className="hover:text-muted-foreground font-medium underline"
            >
              {isLoading ? "Loading..." : "View more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleSection;

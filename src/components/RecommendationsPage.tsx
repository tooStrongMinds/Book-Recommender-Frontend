import React, { useState, useEffect } from "react";
import { Grid, List } from "lucide-react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BookCard from "./BookCard";
import { bookData } from "../utils";
import { fetchRecommendations, Book } from "../components/api/recommendation";

interface PageProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

const RecommendationsPage: React.FC<PageProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search & Results state
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const loadDefaultBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const results = await fetchRecommendations("popular books");
        setBooks(results);
      } catch (err) {
        setBooks(bookData as Book[]);
        console.error("Failed to fetch from API, using fallback data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDefaultBooks();
  }, []);

  const handleSearch = async (searchTerm: string) => {
    if (searchTerm.trim().length < 2) {
      setError("Please enter at least 2 characters");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const results = await fetchRecommendations(searchTerm);
      setBooks(results);
    } catch (err) {
      setError("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#F9F9F9",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <Header
        onMobileMenuToggle={toggleMobileMenu}
        query={query}
        onQueryChange={setQuery}
        onSearch={() => handleSearch(query)}
      />

      {/* Main Content Area */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar isMobile={false} />
        </div>

        {/* Mobile Sidebar */}
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          isMobile={true}
        />

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 md:ml-4">
          {/* Mobile View Toggle */}
          <div className="md:hidden flex justify-end mb-4">
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-gray-300 shadow-md"
                    : "bg-transparent hover:bg-gray-100"
                }`}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-gray-300 shadow-md"
                    : "bg-transparent hover:bg-gray-100"
                }`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Recommendations Title */}
          <div className="flex justify-between items-start">
            <h1
              className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-left"
              style={{
                color: "#FFD900",
                fontFamily: "Inter, sans-serif",
              }}
            >
              RECOMMENDATIONS
            </h1>
            {/* View Toggle */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-gray-300 shadow-md"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-gray-300 shadow-md"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 mb-4">{error}</p>}

          {/* Loading */}
          {loading && <p>Loading...</p>}

          {/* Books Grid */}
          <div
            className={`
              transition-all duration-300 ease-in-out
              ${
                viewMode === "grid"
                  ? "grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
                  : "flex flex-col gap-4 md:gap-6"
              }
              max-w-6xl
            `}
          >
            {books.map((book, index) => (
              <BookCard
                key={book.title}
                id={index}
                title={book.title}
                author={book.author}
                category={book.genre}
                rating={book.rating}
                coverColor="#FFD900" // or any color logic you want
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* Load More Button (optional) */}
          {/* You can implement pagination or load more functionality here */}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;

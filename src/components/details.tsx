import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useParams, useNavigate } from "react-router-dom";
import { bookData } from "../utils";

const BookDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Parse id safely
  const bookId = id ? parseInt(id) : null;
  const book = bookData.find((b) => b.id === bookId);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-700 text-xl mb-4">Book not found.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-yellow-400 px-4 py-2 rounded font-semibold hover:shadow-md transition"
        >
          Go back home
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#F9F9F9",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <Header onMobileMenuToggle={toggleMobileMenu} />

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
          {/* Book Details Section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cover */}
            <div
              className="w-full md:w-1/3 h-64 md:h-80 bg-gray-300 rounded-lg"
              style={{ backgroundColor: book.coverColor }}
              aria-label={`Cover for ${book.title}`}
              role="img"
            ></div>

            {/* Details */}
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">{book.category}</p>
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-lg text-gray-700 font-medium mb-2">
                {book.author}
              </p>
              <p className="text-yellow-500 mb-4">
                {"★".repeat(book.rating)}
                {"☆".repeat(5 - book.rating)}
              </p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-4">
                {book.description}
              </p>
              <button className="bg-yellow-400 px-5 py-2 rounded font-semibold text-sm hover:shadow-md transition">
                Read now
              </button>
            </div>
          </div>

          {/* More Like This */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4 text-yellow-500">
              MORE LIKE THIS
            </h2>
            <div className="flex flex-col gap-4">
              {bookData
                .filter((b) => b.id !== book.id) // exclude current book
                .slice(0, 5) // limit to 5 recommendations
                .map((b) => (
                  <div
                    key={b.id}
                    className="flex items-start gap-4 bg-white p-4 shadow rounded-lg cursor-pointer hover:shadow-md transition"
                    onClick={() => navigate(`/book/${b.id}`)}
                  >
                    <div
                      className="w-20 h-28 rounded-lg bg-gray-300 flex-shrink-0"
                      style={{ backgroundColor: b.coverColor }}
                      aria-label={`Cover for ${b.title}`}
                      role="img"
                    ></div>
                    <div className="flex flex-col flex-1">
                      <p className="text-md font-semibold truncate">
                        {b.title}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {b.author}
                      </p>
                      <div className="flex justify-between mt-2">
                        <p className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 truncate">
                          {b.category}
                        </p>
                        <p className="text-yellow-500 text-sm">
                          {"★".repeat(b.rating)}
                          {"☆".repeat(5 - b.rating)}
                        </p>
                      </div>
                      <button
                        className="mt-2 bg-yellow-400 px-4 py-1 rounded text-sm font-medium w-fit"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/book/${b.id}`);
                        }}
                      >
                        Learn more
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

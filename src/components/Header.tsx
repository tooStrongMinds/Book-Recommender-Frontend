import { Search, Menu } from "lucide-react";

interface HeaderProps {
  onMobileMenuToggle?: () => void;
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onMobileMenuToggle,
  query,
  onQueryChange,
  onSearch,
}) => {
  return (
    <div className="w-full px-4 md:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center">
          <h1
            className="text-2xl md:text-3xl font-bold italic"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <span style={{ color: "#000000" }}>E-</span>
            <span style={{ color: "#FFD900" }}>RECOMMEND</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex flex-1 max-w-2xl mx-4 md:mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by Author, Genre and ISBN"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
              className="w-full px-4 py-2 pr-12 text-center border-b border-gray-300 focus:outline-none focus:border-gray-500 transition-colors min-w-96"
              style={{
                fontFamily: "Inter, sans-serif",
                backgroundColor: "transparent",
              }}
            />
            <button
              onClick={onSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search Button */}
        <button
          className="sm:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          onClick={onSearch}
        >
          <Search size={20} />
        </button>
      </div>

      {/* Mobile Search Bar */}
      <div className="sm:hidden mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Author, Genre and ISBN"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            className="w-full px-4 py-2 text-center border-b border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
            style={{
              fontFamily: "Inter, sans-serif",
              backgroundColor: "transparent",
            }}
          />
          <button
            onClick={onSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

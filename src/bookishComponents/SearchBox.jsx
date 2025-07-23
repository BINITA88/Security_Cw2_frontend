// src/components/SearchBox.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { searchProductsApi, getProductCount, pagination } from "../apis/Api";

const SearchBox = ({ setProducts, setError, setTotalPages, page }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState(() => {
    const params = new URLSearchParams(location.search);
    const qValues = params.getAll("q");
    return qValues[0] || "";
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const qValues = params.getAll("q");
    const firstQuery = qValues.length > 0 ? qValues[0] : "";

    if (firstQuery) {
      searchProductsApi(firstQuery)
        .then((res) => {
          setProducts(res.data.products);
          setTotalPages(1);
        })
        .catch((err) => {
          setError(err.response?.data?.message || "Failed to fetch products.");
        });
    } else {
      getProductCount()
        .then((res) => {
          const count = res.data.productCount;
          setTotalPages(Math.ceil(count / 8));
        })
        .catch((err) => {
          setError(err.response?.data?.message || "Failed to fetch product count.");
        });

      pagination(page, 8)
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((err) => {
          setError(err.response?.data?.message || "Failed to paginate.");
        });
    }
  }, [location.search, page]);

  const handleSearch = () => {
    const sanitizedQuery = searchQuery.replace(/[^\w\s]/gi, "");
    if (!sanitizedQuery) {
      alert("Invalid search input. Only alphanumeric characters and spaces are allowed.");
      return;
    }

    navigate(`?q=${encodeURIComponent(sanitizedQuery)}`);
  };

  return (
    <div className="flex-1 max-w-2xl mx-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-300 h-5 w-5 z-10" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-24 py-3 border-2 border-amber-300/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-amber-300 text-lg"
          placeholder="Search for your next great read..."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;

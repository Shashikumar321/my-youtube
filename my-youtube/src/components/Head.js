import { useDispatch, useSelector } from "react-redux";
import {
  GOOGLE_API_KEY,
  HAMBURGER_URL,
  USER_ICON_URL,
  YOUTUBE_ICON_URL,
  YOUTUBE_SEARCH_API,
} from "../utils/constants";
import { toggleMenu } from "../utils/appSlice";
import { useEffect, useState } from "react";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  const getSearchResults = async () => {
    try {
      const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const json = await data.json();
      setSuggestions(json[1]);
      dispatch(cacheResults({[searchQuery] : json[1]}));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchResults();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  return (
    <div className="fixed top-0 w-full z-10 bg-white grid grid-flow-col justify-between m-2 mt-0 p-2 shadow-sm">
      <div className="flex col-span-2">
        <img
          className="h-6 md:h-8 cursor-pointer hover:bg-gray-100"
          src={HAMBURGER_URL}
          alt="hamburger_img"
          onClick={handleToggleMenu}
        />

        <a href="/">
          <img
            className="ml-2 md:ml-6 h-6 md:h-8 cursor-pointer"
            src={YOUTUBE_ICON_URL}
            alt="youtube_logo"
          />
        </a>
      </div>

      <div className="col-span-8 justify-center">
        <div>
          <input
            className="border border-gray-200 px-6 w-1/2 h-10 rounded-l-full shadow-sm"
            type="text"
            placeholder="Search"
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="w-14 h-10 border border-gray-200 bg-gray-100 rounded-r-full">
            🔍
          </button>
        </div>
        {suggestions.length !== 0 && showSuggestions && (
          <div className="fixed bg-white py-2 w-1/3 rounded-md shadow-md border border-gray-100">
            <ul>
              {suggestions.map((s) => (
                <li
                  key={s}
                  className="px-6 py-1 hover:bg-gray-100 hover:cursor-pointer"
                >
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex col-span-2">
        <img className="h-8" src={USER_ICON_URL} alt="hamburger_img" />
      </div>
    </div>
  );
};

export default Head;

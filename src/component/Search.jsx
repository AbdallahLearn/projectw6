import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [videosList, setVideosList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query) {
      fetchVideos(query);
    }
  }, [location]);

  const fetchVideos = async (query) => {
    const API_KEY = "AIzaSyDCg8NcxMWNlM_RmtzELACwAu4AdeMYw3k";
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${API_KEY}`
    );
    const data = await response.json();
    setVideosList(data.items);
    console.log(data.items);
  };

  return (
    <>
      <Header />
      <div className="h-screen flex">
        <div className="mt-20 w-full">
          <div className="grid grid-cols-4 justify-center max-sm:grid-cols-1">
            {videosList.map((video) => (
              <div key={video.id} className=" p-2">
                <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800"></div>
                <button onClick={() => navigate(`/Video/${video.id.videoId}`)}>
                  <img
                    class="w-full h-full"
                    src={video.snippet.thumbnails.high.url}
                  />
                </button>

                <div className="flex ">
                  <img
                    className="w-[6vw] h-[10vh] rounded-full ml-2 m-1"
                    alt=""
                  />

                  <div className="flex flex-col">
                    <p className="text-white text-left font-semibold text-lg ml-2">
                      {video.snippet.title}
                    </p>
                    <p className="text-gray-400 text-left font-normal text-xs ml-2 ">
                      {video.snippet.channelTitle}
                    </p>
                    <p className="text-gray-400 text-left font-normal text-xs ml-2">
                      {video.statistics?.viewCount || 0} views .{" "}
                      {new Date(video.snippet.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;

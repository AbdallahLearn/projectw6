import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Video = () => {
  const [videosList, setVideosList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&regionCode=Sa&chart=mostPopular&maxResults=10&key=AIzaSyDCg8NcxMWNlM_RmtzELACwAu4AdeMYw3k"
        );
        setVideosList(response.data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate(`/`);
    }
  }, [navigate]);

  return (
    <div className="h-screen flex">
      <div className="mt-20 w-full">
        <div className="grid grid-cols-4 justify-center max-md:grid-cols-2 max-sm:grid-cols-1 ">
          {videosList.map((video) => (
            <div key={video.id} className="p-2 ">
              <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800"></div>
              <button onClick={() => navigate(`/Video/${video.id}`)}>
                <img
                  className="w-full h-full"
                  src={video.snippet.thumbnails.standard.url}
                />
              </button>

              <div className="flex ">
              
                <div className="flex flex-col-reverse">
                  <p className="text-black text-left font-semibold text-lg ml-2">
                    {video.snippet.title}
                  </p>
                  <p className="text-gray-400 text-left font-normal  text-sm ml-2 ">
                    {video.snippet.channelTitle}
                  </p>
                  <p className="text-gray-400 text-left font-normal text-xs ml-2 ">
                    {video.statistics.viewCount} views .{" "}
                    {video.snippet.publishedAt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;

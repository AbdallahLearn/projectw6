import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

const View = () => {
  const [showMore, setShowMore] = useState(false);
  const [videosList, setVideosList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const video = videosList.find((v) => v.id === id);
  const [users, setUsers] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(null);
  const toggleDetails = () => {
    setShowMore(!showMore);
  };

  const toggleDeleteButton = (commentId) => {
    if (showDeleteButton === commentId) {
      setShowDeleteButton(null);
    } else {
      setShowDeleteButton(commentId);
    }
  };

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
    const userData = localStorage.getItem("isLoggedIn");
    if (userData) {
      const parsedUsers = JSON.parse(userData);
      setUsers(parsedUsers);
    }
  }, []);
  const handleAddComment = async () => {
    if (!users || !users.id) {
      console.error("No user data available");
      return;
    }

    try {
      const newComment = {
        name: users.name,
        userid: users.id,
        comment: comment,
        videoId: id,
      };
      await axios.post(
        "https://66e7e6bbb17821a9d9da7058.mockapi.io/comment",
        newComment
      );
      setComments([...comments, newComment]);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          "https://66e7e6bbb17821a9d9da7058.mockapi.io/comment"
        );
        setComments(response.data.filter((comment) => comment.videoId === id));
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);
  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await axios.delete(
          `https://66e7e6bbb17821a9d9da7058.mockapi.io/comment/${commentId}`
        );
        setComments(comments.filter((comment) => comment.id !== commentId));
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-wrap">
        <div
          className="flex flex-col md:flex-row w-full"
          key={video?.id || video?.id.videoId}
        >
          <div className="flex flex-col w-[840px] max-sm:w-[400px] mt-20 ml-1">
            <iframe
              width="840"
              height="560"
              src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video player"
              allowFullScreen
              onMouseOver={(event) => event.target.play()}
              onMouseOut={(event) => event.target.pause()}
              className="max-sm:w-[95%] h-[300px] lg:w-[840px] "
            ></iframe>
            <p className="mt-4 mb-3 text-white text-2xl font-bold">
              {video?.snippet.title}
            </p>
            <div className="flex flex-wrap justify-evenly">
              <div className="flex flex-col w-full md:w-[70vw] ">
                <img
                  className="w-[6vw] h-[10vh]  rounded-full ml-2 mr-1 max-sm:w-14 max-sm:h-14"
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
                <div className="flex flex-col w-40 ">
                  <p className="text-black font-semibold text-base">
                    {video?.snippet.channelTitle}
                  </p>
                  <p className="text-gray-400 font-normal text-lg">
                    86K subscribers
                  </p>
                </div>
              </div>
              <button className="w-[10vw] px-2 bg-red-500 h-9 text-white rounded-full ml-9 max-sm:ml-0 max-sm:mr-10 max-sm:w-20">
                Subscribe
              </button>
              <div className="flex ml-4 md:ml-16 h-10 shadow-sm justify-between rounded-full items-center">
                <button
                  className="bg-[#f2f2f2] w-16 h-9 text-black rounded-l-full flex items-center justify-center"
               >
                  Like
                </button>
                <div className="border-l border-white h-7"></div>
                <button
                  className="bg-[#f2f2f2] w-16 h-9 text-black rounded-r-full flex items-center justify-center"

                >
                  Dislike
                </button>
              </div>
              <button className="px-3 bg-[#f2f2f2] h-9 text-black rounded-full flex items-center justify-center ml-5">
                Share
              </button>
              <button className="bg-white max-sm:hidden  w-14 h-6 mt-2 rounded-full flex items-center justify-center ml-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className="h-6 w-6 text-white"
                >
                  <path
                    fill="#000000"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M56.086,31.96c0,2.207 -1.793,4 -4,4c-2.208,0 -4,-1.793 -4,-4c0,-2.208 1.792,-4 4,-4c2.207,0 4,1.792 4,4Z"
                  />
                  <path
                    fill="#000000"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.086,31.96c0,2.207 -1.793,4 -4,4c-2.208,0 -4,-1.793 -4,-4c0,-2.208 1.792,-4 4,-4c2.207,0 4,1.792 4,4Z"
                  />
                  <path
                    fill="#000000"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M36.086,31.96c0,2.207 -1.793,4 -4,4c-2.208,0 -4,-1.793 -4,-4c0,-2.208 1.792,-4 4,-4c2.207,0 4,1.792 4,4Z"
                  />
                </svg>
              </button>
            </div>
            <div className="w-full h-auto bg-[#f2f2f2] mt-2 rounded-xl p-5 text-black ">
              <div>
                <p>
                  {" "}
                  {video?.statistics.viewCount} views .{" "}
                  {video?.snippet.publishedAt}
                </p>
              </div>
              {!showMore && (
                <button className="text-blue-500 mt-2" onClick={toggleDetails}>
                  More
                </button>
              )}
              {showMore && (
                <div className="mt-3 max-sm:w-72">
                  <p className=" max-sm:w-72">{video?.snippet.description}</p>
                  <button
                    className="text-blue-500 mt-2"
                    onClick={toggleDetails}
                  >
                    Show Less
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col mt-3">
              <div className="flex">
                <p className="text-white font-semibold text-lg">
                  <span>{video?.statistics.viewCount} </span> Comments
                </p>
                <p className="font-semibold text-lg">Sort by</p>
              </div>
            </div>
            <div className="flex w-full md:w-[640px]">
              <svg
                height="40px"
                width="40px"
                className="ml-2 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 461.001 461.001"
                xmlSpace="preserve"
                style={{
                  shapeRendering: "geometricPrecision",
                  textRendering: "geometricPrecision",
                  imageRendering: "optimizeQuality",
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                }}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <circle cx="230.5" cy="230.5" r="200" fill="#4A249D" />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    fontSize="150"
                    fontFamily="Arial"
                    fill="#ffffff"
                  >
                    Z
                  </text>
                </g>
              </svg>
              <div className="flex flex-col w-full justify-end items-end">
                <input
                  type="text"
                  className="w-full h-10 bg-base-100"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <hr />
                <div className="flex">
                  <button className="px-3 w-24 h-10 mt-2  text-black rounded-full flex items-center justify-center">
                    Cancel
                  </button>
                  <button
                    onClick={handleAddComment}
                    className="px-3 w-24 h-10 bg-[#f2f2f2] mt-2 font-bold text-black rounded-full flex items-center justify-center ml-5"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-5 ">
              {comments.map((comment, index) => (
                <div key={index} className="flex mb-4">
                  <svg
                    height="40px"
                    width="40px"
                    className="ml-2 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 461.001 461.001"
                    xmlSpace="preserve"
                    style={{
                      shapeRendering: "geometricPrecision",
                      textRendering: "geometricPrecision",
                      imageRendering: "optimizeQuality",
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                    }}
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <circle cx="230.5" cy="230.5" r="200" fill="#4A249D" />
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dy=".3em"
                        fontSize="150"
                        fontFamily="Arial"
                        fill="#ffffff"
                      >
                        Z
                      </text>
                    </g>
                  </svg>
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <p className="text-white font-semibold">
                          {comment.name}
                        </p>

                        <p className="text-gray-400 text-sm mt-1">
                          {comment.comment}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <button
                          type="button"
                          className="ml-auto"
                          onClick={() => toggleDeleteButton(comment.id)}
                        >
                          
                        </button>
                        {showDeleteButton === comment.id &&
                          comment.userid === users.id && (
                            <button
                              className="px-2 py-1 bg-red-500 text-white rounded-full ml-2 mt-1"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              Delete
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="card bg-neutral text-neutral-content w-96 mt-20 max-sm:mt-5 max-sm: ml-4">
              <div className="card-body items-center text-center bg-[#f2f2f2]">
                <h2 className="card-title text-black">Abdullah Aljohani</h2>
                <p className="text-black">Aspiring Web Developer</p>
                <a
                  href="https://www.linkedin.com/in/abdullah-aljohani-6a6396236/"
                  target="_blank"
                  className="btn btn-linkedin mt-4 btn-primary"
                >
                  Follow me on LinkedIn
                </a>
              </div>
            </div>

            <p className="text-white font-semibold text-lg ml-7 mt-5">
              More videos
            </p>

            {videosList
              .filter((v) => v.id !== id)
              .map((v) => (
                <div
                  className="flex w-full mb-3 cursor-pointer  "
                  onClick={() => navigate(`/video/${v.id}`)}
                  key={v.id}
                >
                  <img
                    src={v.snippet.thumbnails.default.url}
                    alt={v.snippet.title}
                     className="w-60 h-auto ml-6"
                  />
                  <div className="flex flex-col ml-3">
                    <p className="text-black w-60 font-semibold text-sm">
                      {v.snippet.title}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {v.snippet.channelTitle}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {v.statistics.viewCount}{" "}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default View;

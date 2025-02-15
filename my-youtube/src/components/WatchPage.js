import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import {
  GOOGLE_API_KEY,
  YOUTUBE_GET_VIDEO_BY_ID,
  YOUTUBE_GET_VIDEO_COMMENTS,
} from "../utils/constants";
import LiveChat from "./LiveChat";
import Scroll from "./Scroll";

const WatchPage = () => {
  const dispatch = useDispatch();
  const [videoData, setVideoData] = useState(null);

  const [searchParams] = useSearchParams();

  const getVideoDetails = async () => {
    try {
      const data = await fetch(
        `${YOUTUBE_GET_VIDEO_BY_ID}${searchParams.get(
          "v"
        )}&key=${GOOGLE_API_KEY}`
      );
      const json = await data.json();
      setVideoData(json?.items[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getVideoComments = async () => {
    try {
      const data = await fetch(
        "https://www.googleapis.com/youtube/v3/commentThreads",
        {
          params: {
            part: "snippet",
            videoId: searchParams.get("v"),
            key: GOOGLE_API_KEY,
            maxResults: 100,
          },
        }
      );
      const json = await data.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(closeMenu());
    getVideoDetails();
    getVideoComments();
  }, []);

  return (
    <div className=" flex flex-col mt-16 justify-start  w-full   p-4  gap-2">
      <div className="flex flex-col md:flex-row w-full gap-1  rounded-lg">
        <div className="w-full">
          <Scroll />
          {!videoData ? (
            <div className="w-full h-full animate-ping bg-gray-400"></div>
          ) : (
            <div className="flex flex-col w-full">
              <iframe
                className="w-full h-[300px]  md:h-[700px] rounded-lg"
                src={`https://www.youtube.com/embed/${searchParams.get(
                  "v"
                )}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <div className="w-full px-2 py-2 text-xl border-t  text-gray-600 font-bold">
                {videoData?.snippet?.title}
              </div>
              <div className="w-full px-2 py-2 text-xl text-gray-600 bg-gray-100 rounded-lg">
                {videoData?.snippet?.description}
              </div>
            </div>
          )}
        </div>
        <LiveChat />
      </div>

      <div className=" w-full ">
        <CommentsContainer />
      </div>
    </div>
  );
};

export default WatchPage;

const VideoCard = ({ info }) => {
  if (!info) return;

  const { snippet, statistics } = info;

  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="m-2 p-2 w-80 shadow-sm rounded-md hover:bg-gray-100 hover:rounded-none">
      <img className="rounded-md hover:rounded-none" alt="thumbnail" src={thumbnails.medium.url} />
      <ul>
        <li className="font-bold text-sm py-2">{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics.viewCount % 1000}K views</li>
      </ul>
    </div>
  );
};

export default VideoCard;

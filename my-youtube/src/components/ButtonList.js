import ButtonComp from "./ButtonComp";

const list = [
  // "All",
  // "Movies",
  // "Sports",
  // "Resume",
  // "Coding",
  // "Action",
  // "JavaScript",
  // "ReactJS",
  // "Hobbies",
  // "News",
  // "Chants",
  // "Viral",
  // "Hockey",
  // "Football",
  // "Trailers",
//   "Songs",
//   "API",
//   "TypeScript",
//   "Youtube",
//   "Cinema",
];

const ButtonList = () => {
  return (
    <div>
      <div className="flex">
        {list.map((val) => (
          <ButtonComp key={val} name={val} />
        ))}
      </div>
    </div>
  );
};

export default ButtonList;

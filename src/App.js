import "./App.css";
import { useEffect, useState } from "react";
import Editor from "./components/editor/Editor";
import exampleData from "./components/editor/data/exampleData";
import SidebarComponent from "./components/sidebar/Sidebar";
import { ReactComponent as DeleteIconActive } from "./assets/icons/delete-icon-active.svg";
import { ReactComponent as MessageIcon } from "./assets/icons/message.svg";
import { ReactComponent as ClockIcon } from "./assets/icons/clock-icon.svg";
import { ReactComponent as StarIcon } from "./assets/icons/star-icon.svg";
import { ReactComponent as Dots3 } from "./assets/icons/3-dots.svg";
import dayjs from "dayjs";

const DATA = [
  { title: "🤓 Getting Started!", data: exampleData },
  {
    title: ":3 Yippie!!!",
    data: {
      time: 1635603431943,
      blocks: [
        {
          id: "sheNwCUP5A",
          type: "header",
          data: {
            text: "Title - Using Heading for Title",
            level: 3,
          },
        },
      ],
    },
  },
];

function App() {
  const [data, setData] = useState(DATA);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [currentNoteData, setCurrentNoteData] = useState(
    data[currentNoteIndex]
  );
  const [currentTitle, setCurrentTitle] = useState(currentNoteData.title);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setCurrentNoteData(data[currentNoteIndex]);
    setCurrentTitle(currentNoteData.title);

    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, [currentNoteIndex, currentNoteData]);

  return (
    <div className="">
      <div className="flex flex-row justify-start">
        <SidebarComponent
          data={data}
          setData={setData}
          currentIndex={currentNoteIndex}
          setCurrentNoteIndex={setCurrentNoteIndex}
        />
        <div className="flex flex-col w-full min-h-screen bg-slate-200">
          <div className="flex flex-row h-12 w-full pr-96 bg-black fixed top-0 z-10 items-center justify-between">
            <div className="text-white ml-5 w-48 font-bold">{currentTitle}</div>
            <div className="flex flex-row items-center">
              <div className="text-white ml-5 text-sm">
                {`Last edited ${dayjs(currentNoteData?.data?.time).format(
                  "DD/MM/YYYY HH:mm:ss"
                )}`}
              </div>
              <div className="text-white ml-5 text-sm">Share</div>
              <MessageIcon className="w-5 h-5 ml-5" />
              <ClockIcon className="w-5 h-5 ml-5" />
              <StarIcon className="w-5 h-5 ml-5" />
              <Dots3 className="w-5 h-5 ml-5" />
            </div>
          </div>
          <div className="flex flex-row mt-32 mb-20">
            <input
              className="text-5xl bg-slate-200 mx-96 outline-none"
              placeholder="Title"
              value={currentTitle}
              onChange={(event) => {
                setCurrentTitle(event.target.value);
                let tmpCurrentData = currentNoteData;
                tmpCurrentData.title = event.target.value;
                setCurrentNoteData(tmpCurrentData);
              }}
            />
            <button
              onClick={() => {
                if (data.length === 1) {
                  return;
                }
                if (currentNoteIndex === 0) {
                  const tempData = data.splice(currentNoteIndex, 1);
                  setCurrentNoteData(tempData);
                  return;
                } else {
                  const tempData = data.splice(currentNoteIndex, 1);
                  setCurrentNoteIndex(currentNoteIndex - 1);
                  setCurrentNoteData(tempData);
                }
              }}
            >
              <DeleteIconActive className="w-10 h-10 pt" />
            </button>
          </div>

          {isLoading ? (
            <></>
          ) : (
            <Editor
              data={currentNoteData.data}
              setData={(data) => {
                let tmpCurrentData = currentNoteData;
                tmpCurrentData.data = data;
                setCurrentNoteData(tmpCurrentData);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

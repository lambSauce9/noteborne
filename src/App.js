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
import { ColorPicker } from "antd";

export const simpleData = {
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
};

const DATA = [
  {
    title: "🤓 Getting Started!",
    data: exampleData,
    backgroundColor: "#b5a19f",
    subNote: [
      {
        title: "🤓 Sub 1",
        data: simpleData,
        backgroundColor: "#FFFFFF",
        isSubnote: true,
      },
    ],
  },
  {
    title: ":33",
    data: simpleData,
    backgroundColor: "#6ba630",
    subNote: [],
  },
];

function App() {
  const [data, setData] = useState(DATA);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [currentNoteData, setCurrentNoteData] = useState(
    data[currentNoteIndex]
  );
  const [currentTitle, setCurrentTitle] = useState(currentNoteData.title);
  const [currentColor, setCurrentColor] = useState(
    currentNoteData.backgroundColor
  );

  const [currentSubNoteIndex, setCurrentSubNoteIndex] = useState(0);
  const [currentSubNoteData, setSubCurrentNoteData] = useState(
    data[currentNoteIndex].subNote[currentSubNoteIndex]
  );
  const [currentSubTitle, setCurrentSubTitle] = useState(
    currentSubNoteData.title
  );
  const [currentSubColor, setCurrentSubColor] = useState(
    currentSubNoteData.backgroundColor
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isShowingSubnote, setIsShowingSubnote] = useState(false);

  const [titleColor, setTitleColor] = useState("#000000");

  useEffect(() => {
    if (!isShowingSubnote) {
      setIsLoading(true);
      setCurrentNoteData(data[currentNoteIndex]);
      setCurrentTitle(currentNoteData.title);
      setCurrentColor(currentNoteData.backgroundColor);

      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  }, [currentNoteIndex, currentNoteData, isShowingSubnote]);

  useEffect(() => {
    if (isShowingSubnote) {
      setIsLoading(true);
      setSubCurrentNoteData(
        data[currentNoteIndex].subNote[currentSubNoteIndex]
      );
      setCurrentSubTitle(
        data[currentNoteIndex].subNote[currentSubNoteIndex].title
      );

      setCurrentSubColor(
        data[currentNoteIndex].subNote[currentSubNoteIndex].backgroundColor
      );

      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  }, [currentSubNoteIndex, currentSubNoteData, isShowingSubnote]);

  return (
    <div className="">
      <div className="flex flex-row justify-start">
        <SidebarComponent
          data={data}
          setData={setData}
          currentIndex={currentNoteIndex}
          setCurrentNoteIndex={setCurrentNoteIndex}
          currentSubNoteIndex={currentSubNoteIndex}
          setCurrentSubNoteIndex={setCurrentSubNoteIndex}
          isShowingSubnote={isShowingSubnote}
          setIsShowingSubnote={setIsShowingSubnote}
        />
        {isShowingSubnote ? (
          <div
            style={{ backgroundColor: currentSubColor }}
            className={`flex flex-col w-full min-h-screen`}
          >
            <div className="flex flex-row h-12 w-full pr-96 bg-black fixed top-0 z-10 items-center justify-between">
              <div className="text-white ml-5 w-48 font-bold">
                {currentTitle}
              </div>
              <div className="flex flex-row items-center">
                <div className="text-white ml-5 text-sm">
                  {`Last edited ${dayjs(currentNoteData?.data?.time).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}`}
                </div>
                <div
                  onClick={() => {
                    console.log(isShowingSubnote);
                    console.log(currentSubNoteData);
                  }}
                  className="text-white ml-5 text-sm"
                >
                  Share - Subnote
                </div>
                <MessageIcon className="w-5 h-5 ml-5" />
                <ClockIcon className="w-5 h-5 ml-5" />
                <StarIcon className="w-5 h-5 ml-5" />
                <Dots3 className="w-5 h-5 ml-5" />
              </div>
            </div>
            <div className="flex flex-row mt-32 mb-20">
              <input
                style={{ backgroundColor: currentSubColor }}
                className="text-5xl mx-96 outline-none"
                placeholder="Title"
                value={currentSubTitle}
                onChange={(event) => {}}
              />
            </div>

            {isLoading ? (
              <></>
            ) : (
              <Editor data={currentSubNoteData.data} setData={(data) => {}} />
            )}
          </div>
        ) : (
          <div
            style={{ backgroundColor: currentColor }}
            className={`flex flex-col w-full min-h-screen`}
          >
            <div className="flex flex-row h-12 w-full pr-96 bg-black fixed top-0 z-10 items-center justify-between">
              <div className="text-white ml-5 w-48 font-bold">
                {currentTitle}
              </div>
              <div className="flex flex-row items-center">
                <div className="text-white ml-5 text-sm">
                  {`Last edited ${dayjs(currentNoteData?.data?.time).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}`}
                </div>
                <div
                  onClick={() => {
                    console.log(isShowingSubnote);
                  }}
                  className="text-white ml-5 text-sm"
                >
                  Share
                </div>
                <MessageIcon className="w-5 h-5 ml-5" />
                <ClockIcon className="w-5 h-5 ml-5" />
                <StarIcon className="w-5 h-5 ml-5" />
                <Dots3 className="w-5 h-5 ml-5" />
              </div>
            </div>
            <div className="flex flex-row mt-32 mb-20">
              <input
                style={{ backgroundColor: currentColor, color: titleColor }}
                className="text-5xl ml-96 outline-none"
                placeholder="Title"
                value={currentTitle}
                onChange={(event) => {
                  setCurrentTitle(event.target.value);
                  let tmpCurrentData = currentNoteData;
                  tmpCurrentData.title = event.target.value;
                  setCurrentNoteData(tmpCurrentData);
                }}
              />
              <ColorPicker
                style={{ marginTop: 9, marginRight: 10 }}
                value={currentColor}
                size="large"
                showText
                format="hex"
                onChange={(color) => {
                  setCurrentColor(color.toHexString());
                  let tmpCurrentData = currentNoteData;
                  tmpCurrentData.backgroundColor = color.toHexString();
                  setCurrentNoteData(tmpCurrentData);
                }}
              />
              <ColorPicker
                style={{ marginTop: 9, marginRight: 10 }}
                value={titleColor}
                size="large"
                showText
                format="hex"
                onChange={(color) => {
                  setTitleColor(color.toHexString());
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
        )}
      </div>
    </div>
  );
}

export default App;

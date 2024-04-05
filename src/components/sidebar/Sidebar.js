import React, { useState } from "react";
import { Menu, Sidebar, useProSidebar } from "react-pro-sidebar";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-icon.svg";
import { ReactComponent as AddIcon } from "../../assets/icons/plus-icon.svg";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg";
import logo from "../../assets/imgs/logo.png";
import dayjs from "dayjs";
import { simpleData } from "../../App";

export default function SidebarComponent({
  data,
  setData,
  currentIndex,
  setCurrentNoteIndex,
  currentSubNoteIndex,
  setCurrentSubNoteIndex,
  isShowingSubnote,
  setIsShowingSubnote,
}) {
  const { collapseSidebar } = useProSidebar();
  const [isOpen, setIsOpen] = useState(true);
  {
    /* <BurgerIcon className="w-8 h-8 pt-1 ml-5 mt-3" /> */
  }
  return (
    <Sidebar className="flex bg-black text-slate-100">
      <Menu className="fixed top-0">
        <button
          onClick={() => {
            collapseSidebar();
            setIsOpen(!isOpen);
          }}
          className="text-slate-100 w-full justify-items-start content-center"
        >
          {isOpen ? (
            <div className="flex flex-row">
              <img
                className="w-30 h-28 ml-12 mt-5 mb-10"
                alt="logo"
                src={logo}
              />
              <ArrowLeft className="w-12 h-12 pt-1 ml-6" />
            </div>
          ) : (
            <img className="w-18 h-16 ml-0.5" alt="logo" src={logo} />
          )}
        </button>
        <div className="flex flex-row h-8 ml-6">
          <SearchIcon className="" width={30} height={30} />
          {isOpen && (
            <div className="font-bold font-mono pt-1 ml-3 text-amber-500">
              Search
            </div>
          )}
        </div>
        <button
          onClick={() => {
            const t = {
              title: "New Note",
              data: {
                time: dayjs(),
                blocks: [
                  {
                    id: "sheNwCUP5A",
                    type: "header",
                    data: {
                      text: "New Note",
                      level: 3,
                    },
                  },
                ],
              },
              backgroundColor: "#FFFFFF",
              subNote: [
                {
                  title: "🤓 Sub 1",
                  data: simpleData,
                  backgroundColor: "#FFFFFF",
                  isSubnote: true,
                },
              ],
            };
            setData([...data, t]);
          }}
          className="flex flex-row h-8 ml-6 pt-3"
        >
          <AddIcon className="" width={30} height={20} />
          {isOpen && (
            <div className="font-bold font-mono ml-3 text-amber-500">
              New Page
            </div>
          )}
        </button>
        {isOpen ? (
          <div className="mt-10 ml-5">
            {data.map((item, index) => {
              return (
                <div>
                  <div className="flex flex-row">
                    <button
                      key={index}
                      onClick={() => {
                        setIsShowingSubnote(false);
                        setCurrentNoteIndex(index);
                      }}
                      className="flex flex-row justify-between mt-3"
                    >
                      <div
                        className={`font-bold font-mono ${
                          index === currentIndex
                            ? "text-white"
                            : "text-gray-500"
                        }`}
                      >
                        {item.title}
                      </div>
                    </button>
                    <div
                      className="pt-2.5 ml-3 cursor-pointer"
                      onClick={() => {
                        let currentData = data;
                        const t = {
                          title: "Sub note",
                          data: {
                            time: dayjs(),
                            blocks: [
                              {
                                id: "sheNwCUP5A",
                                type: "header",
                                data: {
                                  text: "New Note",
                                  level: 3,
                                },
                              },
                            ],
                          },
                          backgroundColor: "#FFFFFF",
                          isSubnote: true,
                        };

                        const newDataAfterAdd = [
                          ...currentData[index].subNote,
                          t,
                        ];

                        currentData[index].subNote = newDataAfterAdd;
                        setData([...currentData]);
                      }}
                    >
                      +
                    </div>
                  </div>
                  {currentIndex === index && (
                    <div>
                      {item.subNote.length !== 0 &&
                        item.subNote.map((subItem, subIndex) => {
                          return (
                            <button
                              key={subIndex}
                              onClick={() => {
                                setCurrentNoteIndex(index);
                                setIsShowingSubnote(true);
                                setCurrentSubNoteIndex(subIndex);
                              }}
                              className="flex flex-row w-56 justify-between mt-3"
                            >
                              <div
                                className={`font-bold font-monom ml-2.5 ${
                                  isShowingSubnote
                                    ? `${
                                        subIndex === currentSubNoteIndex
                                          ? "text-white"
                                          : "text-gray-500"
                                      }`
                                    : "text-gray-500"
                                }`}
                              >
                                {subItem.title}
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </Menu>
    </Sidebar>
  );
}

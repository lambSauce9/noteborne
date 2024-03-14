import React, { useState } from "react";
import { Menu, Sidebar, useProSidebar } from "react-pro-sidebar";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-icon.svg";
import { ReactComponent as AddIcon } from "../../assets/icons/plus-icon.svg";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg";
import logo from "../../assets/imgs/logo.png";
import dayjs from "dayjs";

export default function SidebarComponent({
  data,
  setData,
  currentIndex,
  setCurrentNoteIndex,
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
                <button
                  key={index}
                  onClick={() => {
                    setCurrentNoteIndex(index);
                  }}
                  className="flex flex-row w-56 justify-between mt-3"
                >
                  <div
                    className={`font-bold font-mono ${
                      index === currentIndex ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {item.title}
                  </div>
                </button>
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

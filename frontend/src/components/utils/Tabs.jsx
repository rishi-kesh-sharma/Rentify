import { useState } from "react";

export default function TabsComponent({
  tabBtns,
  openTab,
  setOpenTab,
  tabItems,
}) {
  return (
    <div className="flex flex-row items-center justify-start flex-wrap w-full  max-w-xl overflow-hidden ">
      <ul className="flex flex-wrap  gap-[1rem]">
        {tabBtns.map((tabBtn) => {
          return (
            <li key={tabBtn.key} className="cursor-pointer">
              <p
                onClick={() => {
                  setOpenTab(tabBtn.key);
                }}
                className={` ${
                  openTab == tabBtn.key
                    ? "bg-green-600 text-white"
                    : "bg-green-400 text-gray-300"
                } inline-block px-4 py-2 text-gray-200 bg-white rounded shadow`}>
                {tabBtn.text}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="p-3 mt-6 bg-white border w-full">
        {tabItems.map((tabItem) => {
          return (
            <div
              className={`${
                openTab === tabItem.id ? "block" : "hidden"
              } flex flex-wrap gap-[1rem]`}>
              {tabItem.components.map((comp) => comp)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

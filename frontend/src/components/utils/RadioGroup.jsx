import React from "react";

const RadioGroup = () => {
  return (
    <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div className="flex items-center pl-3">
          <input
            id="list-radio-license"
            type="radio"
            value=""
            name="list-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="list-radio-license"
            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Driver License{" "}
          </label>
        </div>
      </li>
      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div className="flex items-center pl-3">
          <input
            id="list-radio-id"
            type="radio"
            value=""
            name="list-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="list-radio-id"
            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            State ID
          </label>
        </div>
      </li>
      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div className="flex items-center pl-3">
          <input
            id="list-radio-millitary"
            type="radio"
            value=""
            name="list-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="list-radio-millitary"
            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            US Millitary
          </label>
        </div>
      </li>
      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div className="flex items-center pl-3">
          <input
            id="list-radio-passport"
            type="radio"
            value=""
            name="list-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            for="list-radio-passport"
            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            US Passport
          </label>
        </div>
      </li>
    </ul>
  );
};

export default RadioGroup;

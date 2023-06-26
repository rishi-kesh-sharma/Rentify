const stylingForButton =
  "text-white rounded hover:bg-gray-200 bg-green-500 hover:bg-gray-100 text-gray-100 hover:text-white ";

const AuthButton = () => {
  return (
    <div className="mt-0 relative">
      <a
        href={"/auth"}
        className={`flex items-center px-2 py-3 text-base font-normal text-gray-100 rounded-lg dark:text-white hover:bg-green-600 hover:scale-105 dark:hover:bg-gray-700 transition-all ${stylingForButton}`}>
        <div className="flex-1 ml-3 whitespace-nowrap">{"SignUp or Login"}</div>
      </a>
    </div>
  );
};

module.exports= AuthButton;

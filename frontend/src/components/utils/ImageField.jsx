const ImageField = ({ imageHandler, checkFile, selectedFile, className }) => {
  console.log(selectedFile);
  return (
    <div
      className={`grid gap-2 max-w-[600px] w-[100%] ${className} px-[0.5rem]`}>
      <div className="h-[6rem] w-[6rem]  cursor-pointer relative flex justify-start items-center border-2 rounded-md ">
        <input
          type="file"
          name="file"
          onChange={imageHandler}
          className="z-20 opacity-0 cursor-pointer h-full w-full "
        />
        <div
          className={`absolute h-full w-full flex justify-center items-center gap-[1rem] ${
            selectedFile && "justify-between pr-[0.3rem]"
          }`}>
          {selectedFile && (
            <img
              className={` h-full rounded ${
                checkFile ? "opacity-1" : "opacity-0"
              }`}
              // src={selectedFile ? URL.createObjectURL(selectedFile) : null}
              src={selectedFile}
            />
          )}
          <span className="text-[18px]  lg:w-56 text-gray-600 truncate rext-center ">
            {checkFile ? selectedFile.name : "choose a file"}
          </span>
        </div>
      </div>
    </div>
  );
};
module.exports= ImageField;

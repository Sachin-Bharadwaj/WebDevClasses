export function SidebarClass1() {
  return (
    <div className="flex">
      <div className="transition-all ease-in-out duration-300 dark:text-white text-black dark:bg-black bg-red-200 h-screen md:w-96 w-0">
        Sidebar
      </div>
      <div className="bg-green-200 w-full h-screen dark:text-white text-black dark:bg-black">
        <span className="flex justify-end">
          <button
            onClick={() => {
              const element = document.querySelector("html");
              const classList = element.classList; // This is a DOMTokenList
              let darkflag = false;

              classList.forEach((className) => {
                if (className == "dark") {
                  darkflag = true;
                  document.querySelector("html").classList.remove("dark");
                }
              });

              if (!darkflag) {
                document.querySelector("html").classList.add("dark");
              }
            }}
            className="p-1 m-1 rounded-xl bg-blue-400 dark:text-white text-black"
          >
            Toggle Theme
          </button>
        </span>
        Content
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { SidebarClass1 } from "./components/1-basic-project";
import { SidebarToggle } from "./components/icons/SidebarToggle";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query, matches]);
  //window.matchMedia("(min-width: 768px)");
  return matches;
};

function App() {
  const [SidebarOpen, setSidebarOpen] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (isDesktop == false) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isDesktop]);

  return (
    <div className="flex">
      <Sidebar SidebarOpen={SidebarOpen} setSidebarOpen={setSidebarOpen} />
      <MainContent SidebarOpen={SidebarOpen} />
    </div>
  );
}

function Sidebar({ SidebarOpen, setSidebarOpen }) {
  if (SidebarOpen) {
    return (
      <div className="bg-red-100 h-screen w-96 fixed md:relative">
        <div>
          <div
            className="cursor-pointer hover:bg-slate-200"
            onClick={() => {
              setSidebarOpen(!SidebarOpen);
            }}
          >
            <SidebarToggle />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="fixed top-0 left-0">
        <div
          className="cursor-pointer hover:bg-slate-200"
          onClick={() => {
            setSidebarOpen(!SidebarOpen);
          }}
        >
          <SidebarToggle />
        </div>
      </div>
    );
  }
}

function MainContent() {
  return (
    <div className="w-full">
      <div className="h-48 bg-black hidden md:block"></div>
      <div className="grid grid-cols-11 gap-8 p-8">
        <div className="h-96 rounded-2xl shadow bg-red-300 md:col-span-2 -translate-y-12 shadow-lg col-span-11 hidden md:block"></div>

        <div className="h-96 rounded-2xl shadow bg-green-300 md:col-span-6 shadow-lg col-span-11"></div>

        <div className="h-96 rounded-2xl shadow bg-yellow-300 md:col-span-3  shadow-lg col-span-11"></div>
      </div>
    </div>
  );
}

export default App;

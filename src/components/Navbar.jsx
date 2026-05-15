import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/sim_logo.png";
//import RobotViewer from "./RobotViewer";
import RobotChat from "../pages/RobotChat"; // Import the chat overlay
import dogPng from "../assets/dog.png"; // Import the dog image

const Navbar = ({ scrollToSection }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showRobotChat, setShowRobotChat] = useState(false); // Modal state
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const normalize = (str) => str.toLowerCase().replace(/\s/g, "");

  const handleScroll = (ref, sectionName) => {
    setMenuOpen(false);
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setActiveSection(normalize(sectionName));
    }
  };

  useEffect(() => {
    const sectionRefs = Object.entries(scrollToSection);
    const observer = new window.IntersectionObserver(
      (entries) => {
        // Sort entries by intersection ratio descending
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const name = sectionRefs.find(([, ref]) => ref.current === visible[0].target)?.[0];
          if (name) setActiveSection(normalize(name));
        }
      },
      { threshold: 0.6 }
    );

    sectionRefs.forEach(([, ref]) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [scrollToSection]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1400px] bg-black/75 backdrop-blur-lg rounded-2xl px-6 py-3 shadow-xl z-[1000] transition-all duration-300">
        <div className="flex justify-between items-center w-full font-primary text-white">
          {/* Left Logo */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center bg-black p-1 rounded-md hover:shadow-[0_0_15px_rgba(236,72,153,0.6)] transition-shadow duration-300">
              <img src={logo} alt="SIM Logo" className="w-[70px] h-[50px] object-contain rounded-md" />
              <span className="text-[9px] font-bold tracking-wider font-accent">SUN INFO MEDIA</span>
            </div>
          </div>

          {/* Hamburger (Mobile) */}
          <div className="md:hidden text-xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Links */}
          <div
            className={`flex flex-col md:flex-row items-center gap-6 absolute md:static top-[70px] left-0 right-0 bg-black/95 md:bg-transparent backdrop-blur-lg md:backdrop-blur-none p-5 md:p-0 rounded-b-2xl transform transition-transform origin-top ${
              menuOpen ? "scale-y-100" : "scale-y-0"
            } md:scale-y-100 overflow-hidden md:overflow-visible`}
            style={{ transitionProperty: "transform", zIndex: 100 }}
          >
            {[
              { name: "About", ref: scrollToSection.about },
              { name: "Services", ref: scrollToSection.services },
              { name: "Get in Touch", ref: scrollToSection.contact },
            ].map(({ name, ref }) => (
              <div
                key={name}
                className="relative cursor-pointer group"
                onClick={() => handleScroll(ref, name)}
              >
                <span
                  className={`transition-all duration-300 text-white font-medium px-2 py-1 rounded-md group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-indigo-500 group-hover:bg-clip-text ${
                    activeSection === normalize(name) ? "text-transparent bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text" : ""
                  }`}
                >
                  {name}
                </span>
                {/* Enhanced smooth underline */}
                <span
                  className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-[2px] rounded-full transition-all duration-500 ease-out ${
                    activeSection === normalize(name) ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
                  style={{
                    background: "linear-gradient(90deg, #ec4899 0%, #6366f1 100%)",
                    boxShadow: "0 0 8px rgba(236, 72, 153, 0.6), 0 0 16px rgba(99, 102, 241, 0.4)"
                  }}
                />
                {/* Additional glow effect on hover */}
                <span
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-[1px] rounded-full transition-all duration-700 ease-out opacity-0 group-hover:opacity-60 group-hover:w-[110%] w-0"
                  style={{
                    background: "linear-gradient(90deg, #ec4899 0%, #6366f1 100%)",
                    filter: "blur(2px)"
                  }}
                />
              </div>
            ))}

            {/* Static Gallery Link with enhanced hover effect */}
            <div
              className="relative cursor-pointer group"
              onClick={() => navigate("/globe")}
            >
              <span className="transition-all duration-300 text-white font-medium px-2 py-1 rounded-md group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-indigo-500 group-hover:bg-clip-text">
                Gallery
              </span>
              {/* Enhanced smooth underline for Gallery */}
              <span
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-[2px] w-0 rounded-full transition-all duration-500 ease-out group-hover:w-full opacity-0 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(90deg, #ec4899 0%, #6366f1 100%)",
                  boxShadow: "0 0 8px rgba(236, 72, 153, 0.6), 0 0 16px rgba(99, 102, 241, 0.4)"
                }}
              />
              {/* Additional glow effect on hover for Gallery */}
              <span
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-[1px] rounded-full transition-all duration-700 ease-out opacity-0 group-hover:opacity-60 group-hover:w-[110%] w-0"
                style={{
                  background: "linear-gradient(90deg, #ec4899 0%, #6366f1 100%)",
                  filter: "blur(2px)"
                }}
              />
            </div>

            {/* Robot Viewer Inline (Desktop only, larger and always visible) */}
            <div
                    className="hidden md:flex items-center ml-0 mr-2 cursor-pointer"
                    style={{
                    width: 90,
                    height: 60,
                    padding: 3,
                    background: "rgba(0,0,0,0.25)",
                    borderRadius: "12px",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative",
                    left: -11 // Move a bit to the left
                    }}
                    role="button"
                    tabIndex={0}
                    onClick={() => setShowRobotChat(true)}
                    onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setShowRobotChat(true);
                    }
                    }}
                    title="Open AI chat"
                    aria-label="Open Dog Chat"
                  >
                    <img
                    src={dogPng}
                    alt="Dog"
                    style={{
                      width: "60px",
                      height: "48px",
                      objectFit: "contain",
                      display: "block"
                    }}
                    />
                  </div>
            {/* DODDY AI Button (Mobile only) with enhanced hover */}
            <button
              className="flex md:hidden items-center gap-2 text-white font-bold px-4 py-2 rounded-lg shadow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.6)]"
              style={{
                minWidth: 100,
                background: "linear-gradient(90deg, #ec4899 0%, #6366f1 100%)"
              }}
              onClick={() => setShowRobotChat(true)}
            >
              DODDY AI
            </button>
          </div>
        </div>
      </nav>
      {showRobotChat && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black bg-opacity-60" style={{ backdropFilter: 'blur(4px)' }}>
          <div className="relative w-[99vw] max-w-[1600px] h-[92vh] flex items-center justify-center">
            {/* Close button moved to RobotChat */}
            <RobotChat onClose={() => setShowRobotChat(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
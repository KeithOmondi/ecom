import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import About from "../../components/Layout/About";
import PartnersSection from "../../components/Layout/PartnersSection";
import CEOMessage from "../../components/Layout/CEOMessage";
import Listings from "../../components/Layout/Listings";
import Footer from "../../components/Layout/Footer";

import Video1 from "../../assets/Video1.mp4";
import Video2 from "../../assets/Video3.mp4";
import Video3 from "../../assets/Video4.mp4";
import Video4 from "../../assets/Video5.mp4";

const videos = [Video1, Video2, Video3, Video4];

const HomePage = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  // Auto-play the next video when the source changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload the video source
      videoRef.current.play().catch((error) => console.error("Auto-play error:", error));
    }
  }, [currentVideoIndex]);

  return (
    <div className="bg-gray-50">


      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={videos[currentVideoIndex]}
          autoPlay
          muted
          playsInline
          onEnded={() =>
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
          }
          onCanPlay={() => videoRef.current?.play()}
        />

        <motion.div
          animate={{ y: 100 }}
          transition={{ type: "spring" }}
          className="h-full flex items-center top-[-120px] justify-center relative z-10"
        >
          <div className="text-center text-white px-4 relative">
            <h1 className="text-5xl md:text-7xl font-bold text-blue-950">
              Hao ChapChap
            </h1>
            <p className="mt-4 text-lg md:text-2xl">
              Budget-Friendly Homes with Big Comfort.
            </p>
            <motion.button
              className="mt-8 px-6 py-3 bg-blue-950 text-white hover:bg-gray-100 hover:text-blue-950 rounded-lg text-lg font-semibold shadow-lg transition"
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document
                  .getElementById("listings")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Start Your Search
            </motion.button>
          </div>
        </motion.div>
      </div>

      <About />
      <PartnersSection />
      <Listings />
      <CEOMessage />
      <Footer />
    </div>
  );
};

export default HomePage;
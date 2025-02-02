import { motion } from "motion/react";
import Header from "../../components/Layout/Header";
import Video1 from "../../assets/Video1.mp4";
import About from "../../components/Layout/About";
import PartnersSection from "../../components/Layout/PartnersSection";
import CEOMessage from "../../components/Layout/CEOMessage";
import Listings from "../../components/Layout/Listings";
import Footer from "../../components/Layout/Footer";
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'


const HomePage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.user)

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/home")
    } else {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="bg-white">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
          src={Video1}
          autoPlay
          loop
          muted
          loading="lazy"
          playsInline
        ></video>
        <motion.div
          animate={{ y: 100 }}
          transition={{ type: "spring" }}
          className="h-full flex items-center top-[-120px] justify-center relative z-10"
        >
          <div className="text-center text-white px-4 relative">
            <div className="absolute top-[-20px] right-[-20px] text-blue-950 flex items-center justify-center w-8 h-8 text-xs font-semibold rounded-full border-2 border-blue-950">
              R
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-ellipsis text-blue-950 underlined">
              Hao ChapChap
            </h1>
            <p className="mt-4 text-lg md:text-2xl">
              Budget-Friendly Homes with Big Comfort.
            </p>
            <motion.button
              className="mt-8 px-6 py-3 items-center bg-blue-950 text-white hover:bg-gray-100 hover:text-blue-950 rounded-lg text-lg font-semibold shadow-lg transition"
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById("listings").scrollIntoView({ behavior: "smooth" });
              }}
            >
              Start Your Search
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* About Section */}
      <About />

      {/* Partners Section */}
      <PartnersSection />

      {/* Why Every Rental Feels Like Home Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-48 h-48 bg-blue-800 rounded-full opacity-30"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-700 rounded-full opacity-20"></div>
          <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-blue-600 rounded-full opacity-10"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Why Every Rental Feels Like Home</h2>
          <p className="text-lg leading-relaxed">
            We understand the meaning of comfort and belonging. That’s why our properties are designed
            to make you feel at home, whether you’re staying for a month or a lifetime.
          </p>
        </div>
      </section>
      {/* Listings */}
      <Listings />
      {/* Ceo Message */}
      <CEOMessage />

      <section className="py-12 px-14 bg-blue-950 justify-between  flex items-center text-white text-center">
        <div className="flex flex-col gap-2 justify-cente  items-start"><h2 className="text-3xl font-semibold mb-2">Interested in becoming a Rental agent?</h2>
          <p className="text-lg mb-6">
            We will support you in advancing your career and achieving success.
          </p></div>

        <motion.button
          className="px-8 py-4 bg-gray-100 text-blue-950 font-semibold rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition"
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
          }}
        >
          Contact Us
        </motion.button>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="p-28 bg-white flex flex-col lg:flex-row items-center"
      >
        <img
          src="https://thermohouse.ie/wp-content/uploads/2019/04/hero-image.jpg"
          alt="Contact Us"
          className="w-1/2 rounded-lg shadow-lg"
        />
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold mb-4 text-blue-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Contact Us
          </motion.h2>
          <p className="text-lg text-blue-950 mb-4">
            Get in touch with us for inquiries, support, or assistance.
          </p>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded-lg outline-none border border-gray-300 focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded-lg border outline-none border-gray-300 focus:ring-2 focus:ring-blue-600"
            />
            <textarea
              placeholder="Your Message"
              className="p-3 rounded-lg border outline-none border-gray-300 focus:ring-2 focus:ring-blue-600"
              rows="5"
            ></textarea>
            <motion.button
              className="px-6 py-3 bg-blue-950 hover:bg-gray-100 text-white  hover:text-blue-950rounded-lg"
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default HomePage;

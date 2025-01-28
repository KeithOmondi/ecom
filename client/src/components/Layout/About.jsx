import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import Video2 from "../../assets/Video2.mp4";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

Modal.setAppElement("#root");

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingRange, setBookingRange] = useState([null, null]);
  const [isBooked, setIsBooked] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleBookAppointment = () => {
    const [startDate, endDate] = bookingRange;
    if (startDate && endDate) {
      setIsBooked(true);
      toast.success(`Appointment booked successfully for ${startDate.format('YYYY/MM/DD')} at 12:00 noon!`);
      handleModalClose();
    } else {
      toast.error("Please select both start and end dates.");
    }
  };

  return (
    <section
      id="about"
      className="p-28 flex flex-col bg-white lg:flex-row items-center gap-6 justify-center w-full relative"
    >
      {/* Book an Appointment Button */}
      <motion.button
        onClick={handleModalOpen}
        className={`px-6 py-3 ${isBooked ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-blue-500"} text-blue-950 font-semibold absolute top-10 left-1/2 transform -translate-x-1/2 z-10`}
        disabled={isBooked}
      >
        {isBooked ? "Booked" : "Book an Appointment"}
      </motion.button>

      <div className="flex w-full">
        <div className="w-1/2 px-6 gap-4 flex flex-col justify-center">
          <motion.h2
            className="text-3xl font-bold text-blue-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Are you thinking of renting your own property?
          </motion.h2>
          <p className="text-base font-medium text-blue-950">
            Schedule a free consultation to discuss your rental needs. We assess
            your requirements, provide tailored options, and explain our process.
            You have the freedom to choose whether to partner with us for your
            rental journey.
          </p>
          <motion.button className="px-6 py-3 bg-blue-950 text-white hover:bg-gray-100 hover:text-blue-950 inline-block">
            Learn More
          </motion.button>
        </div>

        <div className="w-1/2">
          <motion.video
            src={Video2}
            className="w-full h-auto rounded-lg shadow-lg"
            autoPlay
            loop
            muted
            playsInline
            controls
            whileHover={{ scale: 1.05 }}
            loading="lazy"
          />
        </div>
      </div>

      {/* Modal for DateTimeRangePicker */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        className="modal-content bg-white rounded-lg shadow-lg w-[100%] max-w-lg mx-auto relative"
        overlayClassName="overlay fixed z-[1000] pt-24 inset-0 bg-black bg-opacity-50 backdrop-blur-md"
      >
        {/* Close Button */}
        <button
          onClick={handleModalClose}
          className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-gray-500"
        >
          &times;
        </button>

        <div className="flex flex-col items-center gap-4 p-4">
          <h3 className="text-xl font-bold text-blue-950">Select Appointment Dates</h3>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimeRangePicker
              value={bookingRange}
              onChange={(newRange) => setBookingRange(newRange)}
              localeText={{ start: 'Check-in', end: 'Check-out' }}
            />
          </LocalizationProvider>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleBookAppointment}
              className="px-6 py-3 bg-blue-950 hover:bg-blue-500 text-white"
              disabled={isBooked}
            >
              Book Appointment
            </button>
            <button
              onClick={handleModalClose}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-400 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast Container */}
      <ToastContainer />
    </section>
  );
};

export default About;

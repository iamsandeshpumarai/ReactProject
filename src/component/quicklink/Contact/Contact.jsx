import React, { useState, useEffect } from 'react';
import Header from '../../Home/Header';
import ContactMap from './ContactMap';
import "./Contact.css";
import ContactInfo from './ContactInfo';
import Footer from '../../Home/Footer';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      setStatusMessage("Please fill in all fields.");
      return;
    }
    setStatusMessage("Your message has been sent successfully!");
    setFormData({ fullName: "", email: "", subject: "", message: "" });
  };

  // Framer Motion animation setup
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  // Define our animation variants
  const slideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div>
      <Header />
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={slideVariants}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col items-center px-4 py-6 mb-5"
      >
        <h1 className="text-3xl font-medium mb-6">Contact Us</h1>
        <p className="mb-5 font-normal">
          We're here to help with any questions about our products, orders, or services. Get in touch with our friendly team.
        </p>

        {statusMessage && <p className="text-green-600 font-semibold">{statusMessage}</p>}

        <div className="w-screen flex flex-col md:flex-row gap-2">
          {/* Left Section */}
          <div className="md:w-1/2 ml-10 p-3 w-full bg-gray-100 rounded-lg mr-[42px]">
            <ContactInfo />
          </div>

          {/* Form Section */}
          <div className="md:w-1/2 w-full bg-white shadow-lg p-6 rounded-lg mr-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="fullName" className='font-medium'>Full Name</label>
                <input 
                
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="placeholder:font-normal border p-2 rounded"
                />
              </div>

              <div className="flex flex-col">
                <label className='font-medium' htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="border p-2 rounded placeholder:font-normal"
                />
              </div>

              <div className="flex flex-col">
                <label className='font-medium' htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  required
                  className="border p-2 rounded placeholder:font-normal"
                />
              </div>

              <div className="flex flex-col">
                <label className='font-medium' htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Enter your message"
                  rows="5"
                  required
                  className="border p-2 rounded placeholder:font-normal"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </motion.div>
      
      <div>
        <h1 className="ml-5 text-2xl font-normal">We Are Here ❤️</h1>
        <ContactMap />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

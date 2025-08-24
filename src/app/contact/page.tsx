import React from "react";
import ContactInfo from "../components/contact/contactForm/ContactForm";
import ContactForm from "../components/contact/contactInfo/ContactInfo";

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-8 lg:px-25">
      {/* Page Header */}
      <div className="text-center mt-10 mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Contact Us
        </h1>
        <div className="w-16 h-1 bg-blue-600 mx-auto mt-4"></div>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form.
        </p>
      </div>

      {/* Main Content: Info and Form */}
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Contact Form Section */}
        <ContactForm />
        {/* Contact Info Section */}
        <ContactInfo />
      </div>
    </div>
  );
};

export default ContactPage;

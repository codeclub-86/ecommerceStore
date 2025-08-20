import React from 'react';

const ContactForm: React.FC = () => {
    return (
        <div className="bg-gray-200 p-8 rounded-md  w-full md:w-2/3">
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Your Subject"
                        className="w-full px-4 py-3 border bg-gray-50 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-3 border bg-gray-50 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="tel"
                        placeholder="Your Phone"
                        className="w-full px-4 py-3 border bg-gray-50 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Your Message"
                        rows={6}
                        className="w-full px-4 py-3 border bg-gray-50  border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                {/* Align button to the left */}
                <div className="flex justify-start">
                    <button
                        type="submit"
                        className="bg-blue-600 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Submit Message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
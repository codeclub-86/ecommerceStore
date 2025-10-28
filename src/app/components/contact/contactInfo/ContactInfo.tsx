import React from 'react';

const ContactInfo: React.FC = () => {
    return (
        <div className="bg-gray-200 p-8 rounded-md w-full md:w-1/3">

            {/* Address Block */}
            <div className="flex items-start mb-8">
                <div className="flex-shrink-0 p-3 bg-blue-100 rounded-full text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                </div>
                <div className="ml-4">
                    <h4 className="text-xl font-semibold text-gray-800">Address</h4>
                    <p className="mt-1 text-gray-600">Liberty Mall Opp: Airport runway,<br /> University Rd, Tehkal, Peshawar, 25000, Pakistan.</p>
                </div>
            </div>

            {/* Call Us Block */}
            <div className="flex items-start mb-8">
                <div className="flex-shrink-0 p-3 bg-blue-100 rounded-full text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                </div>
                <div className="ml-4">
                    <h4 className="text-xl font-semibold text-gray-800">Call us on</h4>
                    <p className="mt-1 text-gray-600">+92 314 0078748 (for call)<br />+92 314 1334484 (for whatsapp)</p>
                </div>
            </div>

            {/* Mail At Block */}
            <div className="flex items-start">
                <div className="flex-shrink-0 p-3 bg-blue-100 rounded-full text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <div className="ml-4">
                    <h4 className="text-xl font-semibold text-gray-800">Mail at</h4>
                    <p className="mt-1 text-gray-600">info@codeclub.tech<br />codeclubb1@gmail.com
                    </p>
                </div>
            </div>

        </div>
    );
};

export default ContactInfo;
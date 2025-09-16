"use client";

import { useState } from "react";
import { useAuthStore } from "@/app/store/authStore"; // ✅ import your auth store

export default function ReviewModal({ pid }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  // ✅ get logged in user from Zustand auth store
  const { user } = useAuthStore();
  const userId = user?.id; // this will be sent to API

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/submitReview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject,
            rating,
            message,
            user_id: userId,
            product_id: pid,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setFeedback("✅ Review submitted successfully!");
        setSubject("");
        setRating(5);
        setMessage("");
        setIsOpen(false);
      } else {
        setFeedback(data.message || "❌ Failed to submit review.");
      }
    } catch (error) {
      setFeedback("⚠️ Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-2 bg-yellow-500 text-white mt-8 hover:bg-black transition-all duration-300"
      >
        Leave a Review
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h5 className="text-lg font-semibold">Leave a Review</h5>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="review-subject"
                      className="block text-sm font-medium mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="review-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                      name="subject"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="review-rating"
                      className="block text-sm font-medium mb-1"
                    >
                      Rating
                    </label>
                    <select
                      id="review-rating"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      name="rating"
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="review-message"
                    className="block text-sm font-medium mb-1"
                  >
                    Review
                  </label>
                  <textarea
                    id="review-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    name="message"
                    rows={6}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                  ></textarea>
                </div>

                {/* Hidden field for user_id */}
                <input type="hidden" name="user_id" value={userId || ""} />
                <input type="hidden" name="product_id" value={pid} />
              </div>

              <div className="flex justify-end border-t px-6 py-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>

            {feedback && (
              <div className="px-6 pb-4 text-sm text-center text-gray-600">
                {feedback}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

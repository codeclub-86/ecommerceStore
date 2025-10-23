"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";

const Register = () => {
  const router = useRouter();
  const [state, setState] = useState<"login" | "register" | "forgot">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [verified, setVerified] = useState(false);
  const [messageType, setMessageType] = useState<"success" | "error">("error");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "verify" | "reset">("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // -------- REGISTER --------
      if (state === "register") {
        if (!/^\d{11}$/.test(phone)) {
          setMessageType("error");
          setMessage("Phone number must be exactly 11 digits");
          setLoading(false);
          return;
        }

        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName: name, email, password, phone }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setMessageType("success");
        setMessage("Account created successfully!");
        setState("login");
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
      }

      // -------- LOGIN --------
      else if (state === "login") {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        useAuthStore.getState().login(data.user, data.token);
        router.push("/");
      }

      // -------- FORGOT PASSWORD --------
      else if (state === "forgot") {
        if (step === "email") {
          const res = await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);

          setMessageType("success");
          setMessage("Verification code sent to your email.");
          setStep("verify");
        } else if (step === "verify") {
          const res = await fetch("/api/auth/verify-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);

          setMessageType("success");
          setMessage("Email verified! Now set your new password.");
          setStep("reset");
        } else if (step === "reset") {
          const res = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);

          setMessageType("success");
          setMessage("Password reset successfully! You can now log in.");
          setStep("email");
          setState("login");
          setEmail("");
          setPassword("");
          setCode("");
        }
      }
    } catch (err: any) {
      setMessageType("error");
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-sm sm:max-w-md md:max-w-lg bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-gray-200"
      >
        <p className="text-center text-2xl sm:text-3xl font-semibold text-gray-800">
          {state === "login"
            ? "Login"
            : state === "register"
              ? "Sign Up"
              : "Forgot Password"}
        </p>

        {/* -------- REGISTER FIELDS -------- */}
        {state === "register" && (
          <>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter your name"
                className="border border-gray-300 rounded-lg w-full p-2 mt-1 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email"
                className="border border-gray-300 rounded-lg w-full p-2 mt-1 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                type="email"
                required
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-600">
                Phone
              </label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="e.g. 03123456789"
                className="border border-gray-300 rounded-lg w-full p-2 mt-1 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                type="tel"
                maxLength={11}
                required
              />
            </div>
          </>
        )}

        {/* -------- LOGIN EMAIL -------- */}
        {state === "login" && (
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg w-full p-2 mt-1 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              type="email"
              required
            />
          </div>
        )}

        {/* -------- FORGOT PASSWORD -------- */}
        {state === "forgot" && (
          <>
            {step === "email" && (
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter your registered email"
                  className="border border-gray-300 rounded-lg w-full p-2 mt-1 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  type="email"
                  required
                />
              </div>
            )}

            {step === "verify" && (
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-600">
                  Verification Code
                </label>
                <input
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                  placeholder="Enter the code sent to your email"
                  className="border border-gray-300 rounded-lg w-full p-2 mt-1 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  type="text"
                  required
                />
              </div>
            )}

            {step === "reset" && (
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-600">
                  New Password
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Enter new password"
                    className="border border-gray-300 rounded-lg w-full p-2 mt-1 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    type={show ? "text" : "password"}
                    required
                  />
                  <span
                    onClick={() => setShow((prev) => !prev)}
                    className="absolute right-3 top-3 text-sm text-blue-600 cursor-pointer"
                  >
                    {show ? "Hide" : "Show"}
                  </span>
                </div>
              </div>
            )}
          </>
        )}

        {(state === "login" || state === "register" || verified) && (
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
                className="border border-gray-300 rounded-lg w-full p-2 mt-1 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                type={show ? "text" : "password"}
                required
              />
              <span
                onClick={() => setShow((prev) => !prev)}
                className="absolute right-3 top-3 text-sm text-blue-600 cursor-pointer"
              >
                {show ? "Hide" : "Show"}
              </span>
            </div>
          </div>
        )}

        {/* -------- SWITCH LINKS -------- */}
        <div className="text-sm text-center text-gray-600 space-y-1">
          {state === "register" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          ) : state === "login" ? (
            <>
              <p>
                Don’t have an account?{" "}
                <span
                  onClick={() => setState("register")}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Sign up
                </span>
              </p>
              <p>
                <span
                  onClick={() => {
                    setState("forgot");
                    setMessage("");
                  }}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Forgot password?
                </span>
              </p>
            </>
          ) : (
            <p>
              Back to login?{" "}
              <span
                onClick={() => {
                  setState("login");
                  setVerified(false);
                  setMessage("");
                }}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          )}
        </div>

        {/* -------- BUTTON -------- */}
        <button
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-medium w-full py-2 rounded-lg mt-2 disabled:opacity-70"
        >
          {loading
            ? "Please wait..."
            : state === "register"
              ? "Create Account"
              : state === "login"
                ? "Login"
                : step === "email"
                  ? "Send Code"
                  : step === "verify"
                    ? "Verify Code"
                    : "Reset Password"}
        </button>

        {message && (
          <p
            className={`text-center text-sm mt-2 ${messageType === "success" ? "text-green-600" : "text-red-500"
              }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;

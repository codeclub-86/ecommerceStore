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
  const [verified, setVerified] = useState(false); // for forgot password flow

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // -------- REGISTER --------
      if (state === "register") {
        if (!/^\d{11}$/.test(phone)) {
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
        if (!verified) {
          // Step 1: Verify phone exists
          const res = await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
          setMessage("Phone verified. Please enter your new password.");
          setVerified(true);
        } else {
          // Step 2: Update password
          const res = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, password }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
          setMessage("Password updated successfully! You can now log in.");
          setVerified(false);
          setState("login");
          setPassword("");
          setPhone("");
          setEmail(""); // <-- add this line
        }
      }
    } catch (err: any) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-150 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white my-20"
    >
      <p className="text-2xl font-medium m-auto">
        {state === "login"
          ? "Login"
          : state === "register"
            ? "Sign Up"
            : "Forgot Password"}
      </p>

      {state === "register" && (
        <>
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              required
            />
          </div>

          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="email"
              required
            />
          </div>

          <div className="w-full">
            <p>Phone</p>
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="e.g. 03123456789"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="tel"
              maxLength={11}
              required
            />
          </div>
        </>
      )}



      {state === "login" && (
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="email"
            required
          />
        </div>
      )}

      {state === "forgot" && (
        <div className="w-full">
          <p>Phone</p>
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            placeholder="e.g. 03123456789"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="tel"
            maxLength={11}
            required
          />
        </div>
      )}

      {(state === "login" || state === "register" || verified) && (
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type={show ? "text" : "password"}
            required
          />
          <span
            onClick={() => setShow((prev) => !prev)}
            className="text-sm text-blue-600 cursor-pointer"
          >
            {show ? "hide" : "show"}
          </span>
        </div>
      )}

      {state === "register" ? (
        <p>
          Already have account?{" "}
          <span
            onClick={() => setState("login")}
            className="text-blue-600 cursor-pointer"
          >
            click here
          </span>
        </p>
      ) : state === "login" ? (
        <p>
          Create an account?{" "}
          <span
            onClick={() => setState("register")}
            className="text-blue-600 cursor-pointer"
          >
            click here
          </span>
          <br />
          <span
            onClick={() => {
              setState("forgot");
              setMessage("");
            }}
            className="text-blue-600 cursor-pointer text-sm"
          >
            Forgot password?
          </span>
        </p>
      ) : (
        <p>
          Back to login?{" "}
          <span
            onClick={() => {
              setState("login");
              setVerified(false);
              setMessage("");
            }}
            className="text-blue-600 cursor-pointer"
          >
            click here
          </span>
        </p>
      )}

      <button
        disabled={loading}
        className="bg-blue-600 hover:bg-black transition-all text-white w-full py-2 rounded-md cursor-pointer"
      >
        {loading
          ? "Please wait..."
          : state === "register"
            ? "Create Account"
            : state === "login"
              ? "Login"
              : !verified
                ? "Verify Phone"
                : "Reset Password"}
      </button>

      {message && (
        <p className="text-center text-sm mt-2 w-full text-red-500">
          {message}
        </p>
      )}
    </form>
  );
};

export default Register;

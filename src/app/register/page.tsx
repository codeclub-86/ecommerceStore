"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [state, setState] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const endpoint =
        state === "register" ? "/api/auth/register" : "/api/auth/login";

      const payload =
        state === "register"
          ? { userName: name, email, password }
          : { email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
      } else {
        setMessage(data.message);

        // ✅ If login, save token (if returned) and redirect
        if (state === "login" && data.token) {
          localStorage.setItem("token", data.token);
          router.push("/"); // 👈 Redirect to homepage
        }

        // Optionally clear fields after success
        if (state === "register") {
          setName("");
          setEmail("");
          setPassword("");
        }
      }
    } catch (err) {
      setMessage("Network error");
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
        {state === "login" ? "Login" : "Sign Up"}
      </p>

      {state === "register" && (
        <div className="w-full">
          <p>Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            name="userName"
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="text"
            required
          />
        </div>
      )}

      <div className="w-full">
        <p>Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="email"
          required
        />
      </div>

      <div className="w-full">
        <p>Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
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
      ) : (
        <p>
          Create an account?{" "}
          <span
            onClick={() => setState("register")}
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
          : "Login"}
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

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
    <div className="w-full min-h-screen flex justify-center items-center px-4 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm text-gray-600 rounded-xl shadow-lg border border-gray-200 bg-white p-6 sm:p-8"
      >
        <p className="text-2xl font-semibold text-center">
          {state === "login"
            ? "Login"
            : state === "register"
              ? "Sign Up"
              : "Forgot Password"}
        </p>

        {state === "register" && (
          <>
            <Field label="Name">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="type here"
                className="input"
                required
              />
            </Field>

            <Field label="Email">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="type here"
                className="input"
                type="email"
                required
              />
            </Field>

            <Field label="Phone">
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="e.g. 03123456789"
                className="input"
                type="tel"
                maxLength={11}
                required
              />
            </Field>
          </>
        )}

        {state === "login" && (
          <Field label="Email">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="type here"
              className="input"
              type="email"
              required
            />
          </Field>
        )}

        {state === "forgot" && (
          <>
            {step === "email" && (
              <Field label="Email">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter registered email"
                  className="input"
                  type="email"
                  required
                />
              </Field>
            )}

            {step === "verify" && (
              <Field label="Verification Code">
                <input
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                  placeholder="Enter code"
                  className="input"
                  required
                />
              </Field>
            )}

            {step === "reset" && (
              <Field label="New Password">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter new password"
                  className="input"
                  type={show ? "text" : "password"}
                  required
                />
              </Field>
            )}
          </>
        )}

        {(state === "login" || state === "register" || verified) && (
          <Field label="Password">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="type here"
              className="input"
              type={show ? "text" : "password"}
              required
            />
          </Field>
        )}

        <SwitchLinks
          state={state}
          setState={setState}
          setVerified={setVerified}
          setMessage={setMessage}
        />

        <button
          disabled={loading}
          className="mt-2 bg-blue-600 hover:bg-blue-700 transition-all text-white w-full py-3 rounded-md text-sm font-medium disabled:opacity-50"
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
                    ? "Verify"
                    : "Reset Password"}
        </button>

        {message && (
          <p className={`text-center text-sm mt-1 ${messageType === "success" ? "text-green-600" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

// ✅ Reusable Components for cleaner code
const Field = ({ label, children }: any) => (
  <div className="w-full">
    <p className="text-sm font-medium mb-1">{label}</p>
    {children}
  </div>
);

const SwitchLinks = ({ state, setState, setVerified, setMessage }: any) => (
  <div className="text-sm text-center w-full">
    {state === "register" ? (
      <p>
        Already have an account?{" "}
        <span className="text-blue-600 cursor-pointer" onClick={() => setState("login")}>
          Login
        </span>
      </p>
    ) : state === "login" ? (
      <p>
        Create an account?{" "}
        <span className="text-blue-600 cursor-pointer" onClick={() => setState("register")}>
          Sign up
        </span>
        <br />
        <span
          onClick={() => {
            setState("forgot");
            setMessage("");
          }}
          className="text-blue-600 cursor-pointer block mt-1"
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
          Click here
        </span>
      </p>
    )}
  </div>
);

export default Register;

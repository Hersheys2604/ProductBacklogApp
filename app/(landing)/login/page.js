"use client";
import "./login.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (response.ok) {
      router.push("/project_backlog");
    } else {
      window.alert("Login Failed, check email and password used");
    }

    //
  };

  return (
    <div alt="background pic of shapes">
      <p className="brand_name" alt="Prolog">
        {" "}
        Prolog{" "}
      </p>
      <form className="login-form" onSubmit={handleSubmit} alt="login form">
        <div className="form-group" alt="form group">
          <label htmlFor="email" alt="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="youremail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            alt="your email input"
          />
        </div>
        <div className="form-group" alt="password section">
          <label htmlFor="password" alt="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            alt="your password input"
          />
        </div>
        <div className="button-container">
          <Link href="/register" alt="link to sign up">
            <button
              type="submit"
              className="register-button"
              alt="Register button"
            >
              Register
            </button>
          </Link>
          <button type="submit" className="login-button" alt="Login button">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

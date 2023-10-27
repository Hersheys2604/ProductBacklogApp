"use client";
import "./signup.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "react-bootstrap/Form";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let allow_create = true;

    // If trying to create admin check if exists
    if (role == "ADMIN") {
      try {
        const user = await fetch("/api/admin?role=ADMIN", {
          method: "GET",
        }).then((res) => res.json());

        if (user == true) {
          window.alert("Error: Admin User Already Exists.");
          allow_create = false;
        }
      } catch (error) {
        window.alert("Error: Can't create user :(");

        console.error(error);
      }
    }

    // Ensure password is same
    if (password != password2) {
      window.alert("Error: Password is not the same.");
      allow_create = false;
    }

    // create user
    if (allow_create) {
      try {
        const body = {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          role: role,
        };
        const response = await fetch(`/api/createUser`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const userInfo = await response.json;
        const data = { email: email, password: password };

        router.push("/login");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form
      className="signup-form"
      onSubmit={handleSubmit}
      alt="form for signing up"
    >
      <div className="signup-group">
        <label htmlFor="first_name" alt="First name">
          First Name
        </label>
        <input
          type="first_name"
          id="first_name"
          name="first_name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          alt="input for first name"
        />
      </div>
      <div className="signup-group">
        <label htmlFor="last_name" alt="last name">
          Last Name
        </label>
        <input
          type="last_name"
          id="last_name"
          name="last_name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          alt="input for last name"
        />
      </div>
      <div className="signup-group">
        <label htmlFor="email" alt="Email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          alt="input for email"
        />
      </div>
      <div className="signup-group">
        <label htmlFor="password" alt="Password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          alt="input for password"
        />
      </div>
      <div className="signup-group">
        <label htmlFor="confirming_password" alt="Confirming Password">
          Confirming Password
        </label>
        <input
          type="password"
          id="confirming_password"
          name="confirming_password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          alt="input for confirming password"
        />
      </div>
      <div className="signup-group">
        <label htmlFor="set_role" alt="Set Role">
          Set Role
        </label>
        <Form.Select
          aria-label={"Select Role"}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          alt="dropdown menu for your role"
          style={{ width: "120%", }}
        >
          <option alt="Select">Select</option>
          <option value="BASIC" alt="Basic">
            Basic
          </option>
          <option value="ADMIN" alt="Admin">
            Admin
          </option>
        </Form.Select>
      </div>
      <button type="submit" className="signup-button" alt="Sign up button">
        Sign up
      </button>
      <div>
      <Link href="../" alt = "Back to login link">
            <button className="backTologin-button" alt = "Back to Login button">
              Back to Login
            </button>
            </Link> 

      </div>
    </form>
  );
}

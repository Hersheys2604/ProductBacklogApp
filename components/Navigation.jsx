"use client";
import React, { createContext } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./Navigation.css";
import Nav from "react-bootstrap/Nav";
// const session = await getServerSession(authOptions);

export default function Navigation({ isAdmin } = props) {
  const router = useRouter();

  return (
    <Nav
      defaultActiveKey="/home"
      className="flex-column"
      style={{
        backgroundColor: "white",
        float: "left",
        width: "15%",
        height: "100%",
        fontSize: "23px",
      }}
      alt="Navigation Bar"
    >
      <Nav.Link href="/project_backlog">Project Backlog</Nav.Link>
      <Nav.Link href="/sprint_backlog">Sprint Backlog</Nav.Link>
      <Nav.Link href="/sprint_view">Sprint View</Nav.Link>
      {isAdmin && <Nav.Link href="/admin_page">Admin Page</Nav.Link>}
      <Nav.Link
        onClick={() => {
          signOut();
          router.push("/login");
        }}
      >
        {!"hi"}
        Sign out
      </Nav.Link>
    </Nav>
  );
}

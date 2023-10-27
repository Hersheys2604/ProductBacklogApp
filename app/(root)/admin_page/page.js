// src/components/MainContent.js
import React from "react";
import prisma from "@/lib/prisma";
import UserTable from "./admin_page";
import { getServerSession } from "next-auth"; //https://www.youtube.com/watch?v=PrdbyNYq-z4
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function AdminPage() {
  const user = await prisma.user.findMany(); //import all tasks + associated tags
  const session = await getServerSession(authOptions);
  let showPage = true;
  let isAdmin = false;

  if (session) {
    showPage = true;
    if (session.user.role == "ADMIN") {
      isAdmin = true;
    }
  } else {
    showPage = false;
  }
  return (
    <>
      {isAdmin && (
        <>
          {" "}
          <h1>Admin Page</h1>
          <br></br>
          <br></br>
          <UserTable data={user} />
        </>
      )}
      {!isAdmin && (
        <>
          {" "}
          <h1>Admin only page</h1>
          <h3>No access allowed</h3>
        </>
      )}
    </>
  );
}

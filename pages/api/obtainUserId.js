import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// Obtains user ID + Names
export default async function handle(req, res) {
  try {
    const userInfo = await prisma.user.findMany({
      select: {
        id: true,
        first_name: true,
      },
    });

    return res.json(userInfo);
  } catch (err) {
    // console.log(err);
    res.status(403).json({ err: "Error occured while adding a new food." });
  }
}

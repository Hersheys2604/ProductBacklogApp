import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// Obtains user ID + Names
export default async function handle(req, res) {
  try {
    const sprintInfo = await prisma.sprint.findMany({
      select: {
        id: true,
      },
    });

    return res.json(sprintInfo);
  } catch (err) {
    // console.log(err);
    res.status(403).json({ err: "Error occured while adding a new Sprint." });
  }
}

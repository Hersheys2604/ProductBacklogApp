import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export default async function handle(req, res) {
  const body = req.body;

  const { first_name, last_name, email, password, role } = req.body;

  if (!first_name || !email || !password || !role) {
    return new NextResponse("Missing name, email, password or role", {
      status: 400,
    });
  }

  // const exist = await prisma.user.findUnique({
  //   where: {
  //     email: email,
  //   },
  // });

  // if (exist) {
  //   return new NextResponse("User exists already", {
  //     status: 400,
  //   });
  // }

  try {
    const result = await prisma.user.create({
      data: {
        ...req.body,
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    // console.log(err);
    return new NextResponse("Unexpected eeroor", {
      status: 403,
    });
  }
}

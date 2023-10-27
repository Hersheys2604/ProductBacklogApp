import prisma from "@/lib/prisma";

// POST /api/user

// Required fields in body: name, email, password
export default async function handle(req, res) {
  try {
    const result = await prisma.user.create({
      data: {
        ...req.body,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    // console.log(err);
    res.status(403).json({ err: "Error occured while adding a new food." });
  }
}

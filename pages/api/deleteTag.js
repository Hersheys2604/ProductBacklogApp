import prisma from "@/lib/prisma";

// POST /api/user

// Required fields in body: name, email, password
export default async function handle(req, res) {
  // const { userId } = req.query;
  try {
    const result = await prisma.tag.delete({
      where: {
        id: req.body.tagId
        // id: parseInt(userId),
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a new food." });
  }
}
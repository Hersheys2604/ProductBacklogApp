import prisma from "@/lib/prisma";

// Obtains user ID + Names
export default async function handle(req, res) {
  try {
    const TagInfo = await prisma.tag.create({
      data: {
        name: req.body.name,
      },
    });

    return res.json(TagInfo);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a new food." });
  }
}

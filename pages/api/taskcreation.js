import prisma from "@/lib/prisma";

// POST /api/user

export default async function handle(req, res) {
  try {
    const result = await prisma.task.create({
      data: {
        name: req.body.name,
        type: req.body.type,
        storyPoints: req.body.storyPoints,
        priority: req.body.priority,
        description: req.body.description,
        status: req.body.status,
        stage: req.body.stage,
        sprint: { connect: { id: req.body.sprintID } },
        assigned_to: { connect: { id: req.body.userID } },
        tags: { connect: req.body.tags },
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a new Task." });
  }
}

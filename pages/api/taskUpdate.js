import prisma from "@/lib/prisma";

export default async function handle(req, res) {
    try {
        const { taskId, updatedData } = req.body; // Assuming updatedData is an object containing the fields to update

        // Use Prisma's upsert method to perform the upsert operation
        const updatedTask = await prisma.task.upsert({
            where: { id: taskId },
            update: updatedData, // Update object containing fields and their new values
            create: updatedData, // If the task doesn't exist, create it with the same data
            include: {
                sprint: { select: { id: true } },
                assigned_to: { select: { id: true, first_name: true } },
                tags: { select: { id: true, name: true } }
            }
        });

        res.status(200).json(updatedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error occurred while updating task." });
    }
}






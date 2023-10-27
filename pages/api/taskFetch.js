import prisma from "@/lib/prisma";

//for updating the database after editing 
//code is not final
export default async function handle(req, res) {
    //defines the request and handles it like an integer
    try {
        const taskID = await prisma.task.findUnique({
            //if the id of the task exists
            where: {id : req.body.taskId}, 
            //sprints tags and user arent assigned to task specifically so they need to be pulled from other tables
            include: {
                sprint: {select: { id: true }},
                assigned_to: {select: { id: true,first_name:true } },
                tags:{select:{id:true,name:true}}
            }          
        });
        res.status(200).json(taskID);
    } catch (err) {
        console.log(err);
        res.status(405).json({ err: "Error occured while editing task." });
    }
}

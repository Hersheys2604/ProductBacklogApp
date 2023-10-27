import prisma from "@/lib/prisma";

export default async function handle(req, res) {
  const tasks = await prisma.task.findMany();
  // console.log(tasks);
  res.status(200).json(tasks);
  // res.json(user);
  // return user;
}

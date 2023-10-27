import Backlog from "@/components/Backlog/BackLog";
import UserStoryTray from "@/components/UserStory/UserStoryTray";
import prisma from "@/lib/prisma";

export default async function ProjectBacklog() {
  //import all tasks + associated tags
  const tasks = await prisma.task.findMany({
    include: { tags: { select: { name: true } } },
  }); //import all tasks + associated tags

  const stories = await prisma.userStory.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      assignedTo: { select: { first_name: true } },
    },
  });

  return (
    <>
      <h1>Project BackLog</h1>
      <br></br>
      <br></br>

      <Backlog {...tasks} />
      <UserStoryTray {...stories} />
    </>
  );
}

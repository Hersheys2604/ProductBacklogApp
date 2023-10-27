import Navigation from "@/components/Navigation";
import SprintBacklog from "@/components/Sprint/SprintBacklog";
import prisma from "@/lib/prisma";
export default async function SprintBacklogPage() {
  // get tasks from current sprint
  const sprints = await prisma.sprint.findMany({
    select: {
      id: true,
      status: true,
      tasks: { include: { tags: { select: { name: true } } } },
    },
  });

  return (
    <>
      <SprintBacklog {...sprints} />
    </>
  );
}

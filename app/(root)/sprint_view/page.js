import Navigation from "@/components/Navigation";
import SprintView from "@/components/Sprint/SprintView";
import prisma from "@/lib/prisma";
import Burndown from "@/components/Burndown/Burndown";

export default async function SprintViewPage() {
  // get tasks from current sprint
  const sprints = await prisma.sprint.findMany({
    select: {
      id: true,
      goal: true,
      status: true,
      startDate: true,
      endDate: true,
      tasks: { include: { tags: { select: { name: true } } } },
    },
  });

  return (
    <>
      <main className="main_content">
        <SprintView {...sprints} />
      </main>
    </>
  );
}

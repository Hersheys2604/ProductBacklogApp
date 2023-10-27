import prisma from '@/lib/prisma';


export default async function handle(req, res) {
    let { id } = req.query;
    id = parseInt(id);
    // status = status;
    // id = parseInt(id);
    const ID = await prisma.task.update({
      where: {
        id: id,
      },
      data : {
        status: req.body.status}
    });
    if (!ID) {
      res.status(404).json({ message: 'ID not found' });
    }
    // console.log(user);
    res.status(200).json(ID);
    // res.json(user);
    // return user;
  }
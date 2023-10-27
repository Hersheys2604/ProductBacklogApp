import prisma from '@/lib/prisma';


export default async function handle(req, res) {
    const { email } = req.query;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    // console.log(user);
    res.status(200).json(user);
    // res.json(user);
    // return user;
    
  }
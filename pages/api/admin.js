import prisma from '@/lib/prisma';


export default async function handle(req, res) {
    const { email } = req.query;
    const user = await prisma.user.findMany({
      where: {
        role: 'ADMIN',
      },
    });
    if (user.length === 0) {
      res.status(200).json(false);
      // console.log('no admin');
    }

    res.status(200).json(true);
    
  }
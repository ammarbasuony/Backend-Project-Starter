import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Utils
import { responseError } from '../utils/error-handler.utils';
import createToken from '../utils/create-token.helper';

export default {
  UserLogin: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userPass = password;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) return res.status(404).json({ success: false, errors: ['User is not exists!'] });

      const checkPassword = await bcrypt.compare(userPass, user.password);
      if (!checkPassword) return res.status(400).json({ success: false, errors: ['Incorrect password!'] });

      const token = createToken(user);

      // Remove password from the response
      const { password, ...userData } = user;

      res.json({ success: true, data: { user: userData, token } });
    } catch (err: any) {
      responseError(res, err);
    }
  },
};

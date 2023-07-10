import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

// Types
import { AuthRequest } from '../models/auth.types.js';

const prisma = new PrismaClient();

// Utils
import { responseError } from '../utils/error-handler.util.js';
import createToken from '../utils/create-token.util.js';
import { isRecordExists } from '../utils/validators.util.js';

export default {
  UserLogin: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userPass = password;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          role: true,
        },
      });
      if (!user) return res.status(404).json({ success: false, errors: ['User is not exists!'] });

      const checkPassword = await bcrypt.compare(userPass, user.password);
      if (!checkPassword) return res.status(400).json({ success: false, errors: ['Incorrect password!'] });

      const token = createToken(user);

      // Remove password from the response
      const { password, ...userData } = user;

      res.json({ success: true, data: userData, token });
    } catch (err: any) {
      responseError(res, err);
    }
  },

  UserRegister: async (req: Request, res: Response) => {
    // Get User Role
    const role = await prisma.role.findFirst({
      where: {
        name: 'User',
      },
    });

    if (!role)
      return res
        .status(404)
        .json({ success: false, errors: ['Something went error!, please contact the adminstrator'] });

    // Add role to request body
    req.body.roleId = role.id;

    // Check if user is exists
    const isUserExists = await isRecordExists(prisma.user, {
      email: req.body.email,
    });

    if (isUserExists) return res.status(400).json({ success: false, errors: ['User is already exists!'] });

    // Hashing password
    const salt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(req.body.password, salt);

    try {
      // Insert into DB
      const user = await prisma.user.create({
        data: req.body,
      });

      // Remove "password" from response body
      const { password, ...userData } = user;

      res.json({ success: true, data: userData });
    } catch (err: any) {
      responseError(res, err);
    }
  },
  GetUserFromToken: async (req: AuthRequest, res: Response) => {
    const token = req.token as string;

    try {
      const decoded = jwt.verify(token, process.env.JWT_USER_SECRET as Secret);

      const user = await prisma.user.findUnique({
        where: {
          id: (decoded as any).data.id,
        },
        include: {
          role: true,
        },
      });

      if (!user) return res.status(404).json({ success: false, errors: ['User is not exists!'] });

      // Remove password from the response
      const { password, ...userData } = user;

      res.json({ success: true, data: userData });
    } catch (err: any) {
      responseError(res, err);
    }
  },
};

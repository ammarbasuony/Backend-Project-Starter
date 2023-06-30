import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

export const prisma = new PrismaClient();

export default {
  getDashboardData: async (req: Request, res: Response) => {
    const numberOfPosts = await prisma.post.count({});
    const numberOfUsers = await prisma.user.count({});

    const posts = await prisma.post.findMany({
      select: {
        createdAt: true,
      },
    });

    const xAxis: string[] = [];
    const yAxis: number[] = [];

    posts.forEach((post) => {
      // Get date in format: 2 Feb 2021
      const date = new Date(post.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      xAxis.push(date);
    });

    const xAxisUnique = [...new Set(xAxis)];

    xAxisUnique.forEach((date) => {
      const count = xAxis.filter((x: string) => x === date).length;
      yAxis.push(count);
    });

    const dashboardData = {
      numberOfPosts,
      numberOfUsers,
      xAxis: xAxisUnique,
      yAxis,
    };

    res.status(200).json({
      success: true,
      data: dashboardData,
    });
  },
};

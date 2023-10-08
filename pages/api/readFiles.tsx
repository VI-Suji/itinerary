// pages/api/readFiles.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const files = await fs.readdir(`${process.cwd()}/content`, 'utf-8');
    const blogs = files.filter((fn) => fn.endsWith('.md'));

    const data = await Promise.all(
      blogs.map(async (blog) => {
        const path = `${process.cwd()}/content/${blog}`;
        const rawContent = await fs.readFile(path, {
          encoding: 'utf-8',
        });
        return rawContent;
      })
    );

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error reading files:', error);
    res.status(500).json({ error: 'Error reading files' });
  }
};

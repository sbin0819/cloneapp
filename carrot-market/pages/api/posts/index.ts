import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const {
    body: { question, latitude, longitude },
    session: { user },
  } = req;
  if (req.method === 'POST') {
    const post = await client.post.create({
      data: {
        question,
        latitude: latitude ? latitude : 100,
        longitude: longitude ? longitude : 100,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      post,
    });
  }
  if (req.method === 'GET') {
    const {
      query: { latitude, longitude },
    } = req;
    const posts = await client.post.findMany({
      where: {
        latitude: {
          gte: +latitude - 0.01,
          lte: +latitude + 0.01,
        },
        longitude: {
          gte: +longitude - 0.01,
          lte: +longitude + 0.01,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            wondering: true,
            answers: true,
          },
        },
      },
    });
    res.json({ ok: true, posts });
  }
}

export default withApiSession(
  withHandler({ method: ['POST', 'GET'], handler }),
);

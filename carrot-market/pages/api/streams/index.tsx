import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const {
    session: { user },
    body: { name, price, description },
  } = req;
  const {
    result: {
      uid,
      rtmps: { streamKey, url },
    },
  } = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.CF_STREAM}`,
        },
        body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10 }}`,
      },
    )
  ).json();
  if (req.method == 'POST') {
    const stream = await client.stream.create({
      data: {
        cloudflareId: uid,
        cloudflareKey: streamKey,
        cloudflareUrl: url,
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, stream });
  }

  if (req.method == 'GET') {
    const streams = await client.stream.findMany({
      // take: 10,
      // skip: 10,
    });
    res.json({ ok: true, streams });
  }
}

export default withApiSession(
  withHandler({ method: ['GET', 'POST'], handler }),
);

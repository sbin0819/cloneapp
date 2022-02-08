import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withIronSessionApiRoute } from 'iron-session/next';
import client from '@libs/server';
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },

    include: { user: true },
  });
  if (!exists) res.status(400).end();
  req.session.user = {
    id: exists?.userId,
  };
  await req.session.save();
  return res.status(200).end();
}

export default withIronSessionApiRoute(withHandler('POST', handler), {
  cookieName: 'carrotsession',
  password:
    'u19023751023957109234715712341234sdfdsafasdf3124sdfdvqwer123rweqrqwerewqr123',
});

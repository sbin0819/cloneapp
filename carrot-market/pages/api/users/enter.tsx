import mail from '@sendgrid/mail';
import twilio from 'twilio';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/index';
import withHandler, { ResponseType } from '@libs/server/withHandler';

mail.setApiKey(process.env.SENDGRID_KEY as string);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  const payload = Math.floor(100000 + Math.random() * 900000) + '';

  if (!user) return res.status(400).json({ ok: false });
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    // await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHONE!,
    //   body: `Your login token is ${payload}.`,
    // });
  } else if (email) {
    // const email = await mail.send({
    //   from: 'sbinha123@gmail.com',
    //   to: 'sbinha123@gmail.com',
    //   subject: 'Your Carrot Market Verification EMAIL',
    //   text: `Your token is ${payload}`,
    //   html: `<h1>hi ${payload}</h1>`,
    // });
  }
  return res.json({
    ok: true,
    ...token,
  });
}

export default withHandler('POST', handler);

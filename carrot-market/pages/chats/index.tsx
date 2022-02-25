import type { NextPage } from 'next';
import Layout from '@components/layout';
import Link from 'next/link';

const Chats: NextPage = () => {
  return (
    <Layout title={'채팅'} hasTabBar>
      <div className="py-10 divide-y-[1px]">
        {[1].map((_, i) => (
          <Link href={`/chats/${i}`} key={i}>
            <a className="flex px-4 cursor-pointer py-3 border-t items-center space-x-3 ">
              <div className="w-12 h-12 rounded-full bg-slate-300" />
              <div>
                <p className="font-medium text-gray-700">Steve Jebs</p>
                <p className="text-sm font-medium text-gray-500">
                  See you tomorrow in the coner at 2pm!
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;

import Layout from '@components/layout';
import type { NextPage } from 'next';
import ProductList from '@components/product-list';

const Sold: NextPage = () => {
  return (
    <Layout title={'나의 캐럿'} hasTabBar>
      <div className="flex flex-col space-y-5 py-10">
        <ProductList kind="favs" />
      </div>
    </Layout>
  );
};

export default Sold;

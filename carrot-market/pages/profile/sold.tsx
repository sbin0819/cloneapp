import Layout from '@components/layout';
import type { NextPage } from 'next';
import Item from '@components/item';
import useSWR from 'swr';
import { ProductWithCount } from 'pages';
import ProductList from '@components/product-list';

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

const Sold: NextPage = () => {
  return (
    <Layout title={'나의 캐럿'} hasTabBar>
      <div className="flex flex-col space-y-5 py-10">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;

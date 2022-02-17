import { ProductWithCount } from 'pages';
import useSWR from 'swr';
import Item from './item';

interface ProductListProps {
  kind: 'favs' | 'sales' | 'purchases';
}

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data[kind]?.map((record: any) => (
        <Item
          id={record.id}
          comments={1}
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.favs}
        />
      ))}
    </>
  ) : null;
}

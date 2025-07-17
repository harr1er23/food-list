import { Pagination } from '@mantine/core';
import React from 'react'
import { ProductCard } from './product-card';
import { useProductsStore } from '../store/products';

export const ProductList = () => {
  const { products, fetchUserProducts, totalPage } = useProductsStore();
  const [activePage, setPage] = React.useState(1);
    
    React.useEffect(() => {
      fetchUserProducts(activePage);
    }, [activePage])

  return (
    <div>
      <div className='flex flex-col gap-3'>
        {products.map(product => <ProductCard {...product}/>)}
      </div>

      {totalPage > 1 && <Pagination className='mt-auto mb-4' total={totalPage} value={activePage} onChange={setPage}/>}
    </div>

  )
}
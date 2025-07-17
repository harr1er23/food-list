import { Button, Text, TextInput } from '@mantine/core';
import { AppLayout } from '../../layouts/app-layout'
import { Search, Settings2 } from 'lucide-react';
import { ProductList } from '../../features/products/ui/product-list';

const ProductsPage = () => {
  return (
    <AppLayout>
      <Text size='xl' fw={700}>Products Database</Text>

      <div className='flex justify-between my-4'>
        <TextInput 
          leftSection={<Search />} 
          placeholder='Search...' 
          variant='unstyled'
        />

        <Button 
          radius={'md'} 
          variant='light'>
            <Settings2/>
        </Button>
      </div>

      <ProductList />
    </AppLayout>
  )
}

export default ProductsPage;
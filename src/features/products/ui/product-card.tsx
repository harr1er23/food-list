import React from 'react'
import type { Product } from '../model/type'
import { Divider, Group, Text } from '@mantine/core'

export const ProductCard: React.FC<Product> = (
  {
    name, 
    protein, 
    fat, 
    carbs, 
    calories 
  }
) => {
  return (
    <div className='flex flex-col'>
      <Text size='xl' fw={700}>{ name }</Text>
      <Group className='flex gap-3'>
        <span>{ protein } g</span>
        <Divider size="sm" orientation="vertical" />
        <span>{ fat } g</span>
        <Divider size="sm" orientation="vertical" />
        <span>{ carbs } g</span>
        <Divider size="sm" orientation="vertical" />
        <span>{ calories } cal</span>
      </Group>
    </div>
  )
}
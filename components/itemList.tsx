'use client'

import Image from 'next/image'

import { ALL_ITEMS } from '@/lib/items/types'
import { Button } from './ui/button'

export function ItemList(props: { onClick?: (itemName: string) => void }) {
  return (
    <div className="flex flex-col items-start">
      {ALL_ITEMS.map((item) => {
        return (
          <Button
            variant="ghost"
            className="pl-0 py-1"
            onClick={() => props.onClick?.(item.name)}
            key={item.name}
          >
            <div className="flex gap-1 items-center">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  height="24"
                  width="24"
                  alt="Item Image"
                />
              ) : null}
              {item.name}
            </div>
          </Button>
        )
      })}
    </div>
  )
}

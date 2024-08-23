'use client'

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

type Item = {
  name: string
  amount?: number
  sellPrice?: number
  buyPrice?: number
}
const columns: ColumnDef<Item>[] = [
  {
    id: 'name',
    header: 'Item',
    accessorKey: 'name',
    cell: (cell) => {
      const itemName: string = cell.row.getValue('name')
      const imageUrl = getItemImage(itemName)

      return (
        <div className="flex items-center gap-2">
          <Image src={imageUrl} height={24} width={24} alt="image of item" />
          <p>{itemName}</p>
        </div>
      )
    },
  },
  {
    id: 'itemType',
    header: 'Type',
    accessorKey: 'itemType',
    cell: ({ row }) => {
      const itemType: string = row.getValue('itemType')

      return <Badge variant="outline">{itemType}</Badge>
    },
  },
  {
    id: 'amount',
    header: ({ column }) => (
      <p className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </p>
    ),
    accessorKey: 'amount',
    cell: ({ row }) => (
      <p className="text-right">{row.getValue('amount') || '-'}</p>
    ),
  },
  {
    id: 'sellPrice',
    header: ({ column }) => (
      <p className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Sell Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </p>
    ),
    accessorKey: 'sellPrice',
    cell: ({ row }) => (
      <p className="text-right">{row.getValue('sellPrice') || '-'}</p>
    ),
  },
  {
    id: 'buyPrice',
    accessorKey: 'buyPrice',
    header: ({ column }) => (
      <p className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Buy Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </p>
    ),
    cell: ({ row }) => (
      <p className="text-right">{row.getValue('buyPrice') || '-'}</p>
    ),
  },
  {
    id: 'stackSize',
    accessorKey: 'stackSize',
    header: ({ column }) => (
      <p className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Stack Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </p>
    ),
    cell: ({ row }) => (
      <p className="text-right">{row.getValue('stackSize') || '-'}</p>
    ),
  },
]

const getItemImage = (_itemName: string) => {
  // TODO: Replace placeholder with real images
  return 'https://wiki.goodcompanygame.com/gamedb/icons/icons_modules/itm_plastic_case.png'
}

export function ItemTable(props: { items: Item[] }) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    columns,
    data: props.items,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  })
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

'use client'

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Input } from "./ui/input"

type Recipe = {
  name: string
  craftTime: number
}

export const RecipeTable = () => {
  const columnHelper = createColumnHelper<Recipe>()

  const columns = [
    columnHelper.accessor('name', {
      cell: info => info.getValue(),
      header: 'Name'
    }),
    columnHelper.accessor('craftTime', {
      header: 'Craft Time'
    })
  ]

  const data: Recipe[] = [{
    name: 'Plastic Case',
    craftTime: 0.5
  }]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  return (
    <>
      <Button>+ Add Recipe</Button>
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
            // New Recipe Input
          ) : (null)}
          <TableRow>
            <TableCell>
              <Input type="text" placeholder="Name" />
            </TableCell>
            <TableCell>
              <Input type="number" step={0.01} defaultValue={1} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table >
    </>
  )

}
'use client';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useTransaction } from '@/app/(student)/transaction/hooks';
import { Path } from '@/constant';

import { AmountUnit, TCourse, Transaction as TransactionType } from '@/types';

const Transaction = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [transactions, total] = useTransaction();
  const transactionData = transactions.data;
  const totalData = total.data;
  const isLoading = transactions.isLoading || total.isLoading;
  const columns: ColumnDef<TransactionType>[] = useMemo(
    () => [
      {
        accessorKey: 'course',
        header: () => {
          return 'Course';
        },
        cell: ({ row }) => {
          const courseName = (row.getValue('course') as TCourse).name;
          const image = (row.getValue('course') as TCourse).image.url;
          const courseId = (row.getValue('course') as TCourse).id;
          return (
            <div className='flex items-center space-x-2'>
              <Image
                src={image}
                width={150}
                height={150}
                alt='image url'
                className='rounded-md'
              />
              <Link
                href={Path.CourseDetail(courseId)}
                className='text-tertiary-800 font-bold'
              >
                {courseName}
              </Link>
            </div>
          );
        },
      },
      {
        accessorKey: 'amount',
        header: () => <div className='text-center'>Amount</div>,
        cell: ({ row }) => {
          return <div className='text-center'>{row.getValue('amount')}</div>;
        },
      },
      {
        accessorKey: 'amountUnit',
        header: () => <div className='text-center'>Amount Unit</div>,
        cell: ({ row }) => {
          return (
            <div className='text-center'>
              {row.getValue('amountUnit') == AmountUnit.Dollar
                ? 'Dollar'
                : 'ETH'}
            </div>
          );
        },
      },
      {
        accessorKey: 'createdAt',
        header: () => <div className='text-right'>Time</div>,
        cell: ({ row }) => {
          return (
            <div className='text-right font-medium'>
              {format(row.getValue('createdAt'), 'dd/MM/yyyy')}
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: transactionData || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='w-full px-3'>
      <div className='flex w-full py-4'>
        <div className='flex items-center space-x-2 '>
          <div className='space-x-4 flex'>
            {isLoading ? (
              <>
                <Skeleton className='w-24 h-4' />
                <Skeleton className='w-24 h-4' />
              </>
            ) : (
              <>
                <Label className='text-lg'>{totalData?.dollar}$</Label>
                <Label className='text-lg'>{totalData?.eth}ETH</Label>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='rounded-md border'>
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className='flex space-x-2 items-center'>
                    <Skeleton className='w-32 h-20' />
                    <Skeleton className='w-44 h-4' />
                  </TableCell>
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Transaction;

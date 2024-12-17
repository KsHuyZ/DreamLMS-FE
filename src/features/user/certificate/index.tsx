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
import { Link2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

import Input from '@/components/inputs/Input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useAuth } from '@/store/user.store';

import { Path } from '@/constant';
import { useUserCertificate } from '@/features/user/certificate/hooks';

import { TCourse, UserCertificate } from '@/types';

const CertificateProfile = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { data, isLoading } = useUserCertificate();
  const { user } = useAuth();
  const columns: ColumnDef<UserCertificate>[] = useMemo(
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
        accessorKey: 'timestamp',
        header: () => <div className='text-right'>Time</div>,
        cell: ({ row }) => {
          return (
            <div className='text-right font-medium'>
              {format(row.getValue('timestamp'), 'dd/MM/yyyy')}
            </div>
          );
        },
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          const courseId = (row.getValue('course') as TCourse).id;
          return (
            <Link href={Path.Certificate(user?.id || '', courseId)}>
              <Link2 className='w-4 h-4' />
            </Link>
          );
        },
      },
    ],
    [user]
  );

  const table = useReactTable({
    data: data || [],
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
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter course...'
          value={(table.getColumn('course')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('course')?.setFilterValue(event.target.value)
          }
          className='rounded-md w-56'
        />
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
            {table.getRowModel().rows?.length ? (
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

export default CertificateProfile;

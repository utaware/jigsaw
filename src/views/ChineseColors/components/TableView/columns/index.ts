import { h } from 'vue'

import type { ColumnDef } from '@tanstack/vue-table'
import type { TChineseColor } from '@/views/ChineseColors/types'

export const columns: ColumnDef<TChineseColor>[] = [
  {
    id: 'swatch',
    header: '色彩',
    enableGlobalFilter: false,
    cell: ({ row }) =>
      h('span', {
        class:
          'block size-8 rounded-full border border-foreground/15 shadow-sm',
        style: { backgroundColor: row.original.hex },
        title: row.original.hex,
      }),
  },
  {
    accessorKey: 'name',
    header: '名称',
    cell: ({ row }) => h('span', { class: 'font-semibold' }, row.original.name),
  },
  {
    accessorKey: 'pinyin',
    header: '拼音',
    cell: ({ row }) =>
      h('code', { class: 'text-muted-foreground' }, row.original.pinyin),
  },
  {
    accessorKey: 'hex',
    header: 'HEX',
    cell: ({ row }) =>
      h('code', { class: 'text-muted-foreground' }, row.original.hex),
  },
  {
    accessorKey: 'RGB',
    header: 'RGB',
    enableGlobalFilter: false,
    cell: ({ row }) =>
      h(
        'code',
        { class: 'text-muted-foreground' },
        row.original.RGB.join(', '),
      ),
  },
  {
    accessorKey: 'CMYK',
    header: 'CMYK',
    enableGlobalFilter: false,
    cell: ({ row }) =>
      h(
        'code',
        { class: 'text-muted-foreground' },
        row.original.CMYK.join(', '),
      ),
  },
]

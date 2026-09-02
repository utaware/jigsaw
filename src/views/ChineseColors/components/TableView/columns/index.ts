import type { ColumnDef } from '@tanstack/vue-table'
import type { TChineseColor } from '@/views/ChineseColors/types'

export const columns: ColumnDef<TChineseColor>[] = [
  {
    id: 'swatch',
    header: '色彩',
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'name',
    header: '名称',
  },
  {
    accessorKey: 'hex',
    header: 'HEX',
  },
  {
    accessorKey: 'RGB',
    header: 'RGB',
  },
]

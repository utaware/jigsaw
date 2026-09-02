<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { ChevronLeft, ChevronRight, Search } from 'lucide-vue-next'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { columns } from './columns'

import type { TChineseColor } from '@/views/ChineseColors/types'
import type { Updater } from '@tanstack/vue-table'

const props = defineProps<{
  data: TChineseColor[]
}>()

const emits = defineEmits<{
  'row-click': [TChineseColor]
}>()

const globalFilter = ref('')

const table = useVueTable({
  data: props.data,
  columns,
  state: {
    get globalFilter() {
      return globalFilter.value
    },
  },
  onGlobalFilterChange: (updater: Updater<string>) => {
    globalFilter.value =
      typeof updater === 'function' ? updater(globalFilter.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  initialState: {
    pagination: {
      pageSize: 10,
    },
  },
})

const filteredCount = computed(() => table.getFilteredRowModel().rows.length)

const handleRowClick = (row: TChineseColor) => {
  emits('row-click', row)
}
</script>

<template>
  <div class="space-y-3">
    <div
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <label
        class="flex h-10 w-full max-w-sm items-center gap-2 rounded-md border border-input bg-background px-3 focus-within:ring-2 focus-within:ring-ring/30 sm:w-80"
      >
        <Search
          class="size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          v-model="globalFilter"
          type="search"
          class="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          placeholder="搜索名称、拼音或 HEX"
          aria-label="搜索中国传统色"
        />
      </label>
    </div>

    <div class="overflow-x-auto rounded-md border border-border bg-card">
      <table class="w-full min-w-184 text-left text-sm">
        <thead class="bg-muted/60 text-xs text-muted-foreground">
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="h-11 px-4 font-semibold"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in table.getRowModel().rows"
            class="border-t border-border transition-colors hover:bg-accent/50"
            :key="row.id"
            @click="handleRowClick(row.original)"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="px-4 py-3"
            >
              <slot
                :name="`cell-${cell.column.id}`"
                :row="cell.row.original"
                :cell="cell"
                :value="cell.getValue()"
              >
                <FlexRender
                  v-if="cell.column.columnDef.cell"
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
                <span v-else class="text-muted-foreground">{{
                  cell.getValue()
                }}</span>
              </slot>
            </td>
          </tr>
          <tr v-if="!table.getRowModel().rows.length">
            <td
              :colspan="columns.length"
              class="h-32 text-center text-muted-foreground"
            >
              没有找到匹配的颜色。
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 分页 -->
    <Pagination
      v-slot="{ page }"
      :page="table.getState().pagination.pageIndex + 1"
      :total="filteredCount"
      :items-per-page="10"
      :sibling-count="1"
      show-edges
      class="justify-between"
      @update:page="table.setPageIndex($event - 1)"
    >
      <p class="text-sm text-muted-foreground">共 {{ filteredCount }} 条</p>
      <PaginationContent v-slot="{ items }">
        <!-- 上一页 -->
        <PaginationPrevious aria-label="上一页" title="上一页">
          <ChevronLeft class="size-4" />
        </PaginationPrevious>
        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page"
          >
            {{ item.value }}
          </PaginationItem>
          <PaginationEllipsis v-else />
        </template>
        <!-- 下一页 -->
        <PaginationNext aria-label="下一页" title="下一页">
          <ChevronRight class="size-4" />
        </PaginationNext>
      </PaginationContent>
    </Pagination>
  </div>
</template>

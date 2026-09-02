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

import { Button } from '@/components/ui/button'
import { columns } from './columns'

import type { TChineseColor } from '@/views/ChineseColors/types'
import type { Updater } from '@tanstack/vue-table'

const props = defineProps<{
  data: TChineseColor[]
}>()

const globalFilter = ref('')

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return columns
  },
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
const pageCount = computed(() => table.getPageCount())
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
      <p class="text-sm text-muted-foreground">共 {{ filteredCount }} 条</p>
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
            :key="row.id"
            class="border-t border-border transition-colors hover:bg-accent/50"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="px-4 py-3"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
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

    <div class="flex items-center justify-between gap-3">
      <p class="text-sm text-muted-foreground">
        第 {{ table.getState().pagination.pageIndex + 1 }} / {{ pageCount }} 页
      </p>
      <div class="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          type="button"
          :disabled="!table.getCanPreviousPage()"
          title="上一页"
          aria-label="上一页"
          @click="table.previousPage()"
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          type="button"
          :disabled="!table.getCanNextPage()"
          title="下一页"
          aria-label="下一页"
          @click="table.nextPage()"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  </div>
</template>

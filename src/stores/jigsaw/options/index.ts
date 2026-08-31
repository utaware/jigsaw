export interface ISplitSizeOption {
  icon: string
  text: string
  size: number
}

export const splitSizeOptions: ISplitSizeOption[] = [
  { icon: '🌱', text: '简单', size: 3 },
  { icon: '🌿', text: '中等', size: 4 },
  { icon: '🍃', text: '困难', size: 5 },
  { icon: '🌳', text: '专家', size: 6 },
]

export const [{ size: defaultSplitSize }] = splitSizeOptions

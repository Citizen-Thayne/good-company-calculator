export const ITEM_CATEGORIES = [
  'Materials',
  'Components',
  'Small Cases',
  'Product',
] as const
type ItemCategory = (typeof ITEM_CATEGORIES)[number]

export const MATERIAL_NAMES = ['Plastic'] as const
export type MaterialName = (typeof MATERIAL_NAMES)[number]

export const COMPONENT_NAMES = ['Plastic Case'] as const

type ComponentName = (typeof COMPONENT_NAMES)[number]

export type IngredientName = ComponentName | MaterialName

export const PRODUCT_TYPES = ['Calculator', 'Toy Robot'] as const
export type ProductType = (typeof PRODUCT_TYPES)[number]

type BaseItem = {
  name: string
  stackSize: number
  imageUrl?: string
}

export type RecipeItem = {
  name: IngredientName
  count: number
}

export type Craftable = {
  recipe: RecipeItem[]
  craftTime: number
  craftBatchSize: number
}

type Sellable = {
  sellPrice: number
}

type MaterialItem = BaseItem & {
  name: MaterialName
  category: 'Materials'
  stackBuyPrice: number
}

type ComponentItem = BaseItem &
  Craftable &
  Sellable & {
    category: Omit<ItemCategory, 'Materials' | 'Product'>
  }

export type ProductItem = BaseItem &
  Craftable &
  Sellable & {
    stackSize: 1
    category: 'Product'
    productType: ProductType
  }

export type Item = MaterialItem | ComponentItem | ProductItem

export const MATERIAL_ITEMS: MaterialItem[] = [
  {
    name: 'Plastic',
    category: 'Materials',
    stackBuyPrice: 800,
    stackSize: 100,
    imageUrl:
      'https://wiki.goodcompanygame.com/gamedb/icons/icons_materials/itm_plastic.png',
  },
]
export const COMPONENT_ITEMS: ComponentItem[] = [
  {
    name: 'Plastic Case',
    category: 'Small Cases',
    craftTime: 1,
    craftBatchSize: 1,
    recipe: [{ count: 2, name: 'Plastic' }],
    sellPrice: 50,
    stackSize: 20,
    imageUrl:
      'https://wiki.goodcompanygame.com/gamedb/icons/icons_modules/itm_plastic_case.png',
  },
]

export const ALL_ITEMS = [...MATERIAL_ITEMS, ...COMPONENT_ITEMS] as const

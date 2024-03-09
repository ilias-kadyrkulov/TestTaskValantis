export enum Fields {
    brand = 'brand',
    product = 'product',
    price = 'price'
}
export type TFieldsProps = Partial<{
    [key in keyof typeof Fields]: key extends 'price' ? number | string : string
}>

export type TGetIdsRequest = {
    action: 'get_ids'
    params?: TGetIdsParams
}
export type TGetIdsParams = {
    offset?: number
    limit?: number
}
export type TGetIdsResponse = {
    result: string[]
}

export type TGetItemsRequest = {
    action: 'get_items'
    params?: TGetItemsParams
}
export type TGetItemsParams = {
    ids: string[] | undefined
}
export type TGetItemsResponse = {
    result: TItem[] | null
}
export type TItem = {
    brand: string | null
    id: string
    price: number
    product: string
}

export type TGetFieldsRequest = {
    action: 'get_fields'
    params?: TGetFieldsParams
}
export type TGetFieldsParams = {
    field: Fields
    offset?: number
    limit?: number
}
export type TGetFieldsResponse = {
    result: Array<string | null> | Array<Fields>
}

export type TFilterRequest = {
    action: 'filter'
    params?: TFieldsProps
}
export type TFilterResponse = {
    result: string[]
}

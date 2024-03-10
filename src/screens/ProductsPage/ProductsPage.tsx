import { FC, useEffect, useState } from 'react'
import { valantisApi } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import { FilterDropdown } from './FilterDropdown'
import { Pagination } from '@/ui/pagination/Pagination'
import { Product } from './Product/Product'
import { ItemSkeleton } from '@/common/ItemSkeleton/ItemSkeleton'
import {
    Fields,
    TFieldsProps,
    TGetIdsParams,
    TGetItemsParams,
    TItem
} from '@/types/services.types'
import { AxiosError } from 'axios'
import {
    FIELDS_KEY,
    FILTER_KEY,
    IDS_KEY,
    ITEMS_KEY
} from '@/constants/constants'
import { useCustomMutation } from '@/hooks/useCustomMutation'
import 'react-loading-skeleton/dist/skeleton.css'

export const ProductsPage: FC = () => {
    const [uniqueItemsData, setUniqueItemsData] = useState<TItem[]>([])

    const [totalItemsCount, setTotalItemsCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    //@ts-ignore
    const [limit, setLimit] = useState(50) //TODO - Можно менять порцию

    const [params, setParams] = useState<TFieldsProps>({})

    const totalPages = Math.ceil(totalItemsCount / limit)

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        const newOffset = (pageNumber - 1) * limit
        idsMutate({ offset: newOffset, limit: limit })
    }

    const { mutate: idsMutate, data: idsData } = useCustomMutation(
        [IDS_KEY],
        ({ offset, limit }: TGetIdsParams) =>
            valantisApi.getIds({ offset: offset, limit: limit }),
        {
            onError(error: AxiosError, variables) {
                console.error(
                    'Ошибка при получении идентификаторов товаров:',
                    error.response?.data
                )
                idsMutate(variables)
                console.log('Повторный запрос за идентификаторами товаров...')
            }
        }
    )

    const { mutate: itemsMutate, isPending } = useCustomMutation(
        [ITEMS_KEY],
        ({ ids }: TGetItemsParams) => valantisApi.getItems({ ids: ids }),
        {
            onSuccess(data) {
                const uniqueItemsMap = new Map()
                data?.forEach(item => {
                    if (!uniqueItemsMap.has(item.id)) {
                        uniqueItemsMap.set(item.id, item)
                    }
                })

                setUniqueItemsData(Array.from(uniqueItemsMap.values()))
                console.log('Товары успешно получены!')
            },
            onError(error: AxiosError, variables) {
                console.error(
                    'Ошибка при получении товаров:',
                    error.response?.data
                )
                itemsMutate(variables)
                console.log('Повторный запрос за товарами...')
            }
        }
    )

    const { mutate: fieldsMutate } = useCustomMutation(
        [FIELDS_KEY],
        (field: Fields) => valantisApi.getFields({ field: field }),
        {
            onSuccess({ result }) {
                setTotalItemsCount(result.length)
            },
            onError(error: AxiosError, variables) {
                console.error(
                    'Ошибка при получении полей товаров:',
                    error.response?.data
                )
                fieldsMutate(variables)
                console.log('Повторный запрос за полями товаров...')
            }
        }
    )

    const { mutate: filterMutate, data: filterData } = useMutation({
        mutationKey: [FILTER_KEY],
        mutationFn: ({ brand, price, product }: TFieldsProps) =>
            valantisApi.filter({
                brand: brand,
                price: price,
                product: product
            }),
        onSuccess({ result }) {
            setTotalItemsCount(result.length)
        },
        onError(error: AxiosError, variables) {
            console.error(
                'Ошибка при получении фильтрованных товаров:',
                error.response?.data
            )
            filterMutate(variables)
            console.log('Повторный запрос за фильтрованными товарами...')
        }
    })

    useEffect(() => {
        fieldsMutate(Fields.product)

        idsMutate({ limit: limit })
    }, [])

    useEffect(() => {
        idsData && itemsMutate({ ids: idsData })
    }, [idsData])

    useEffect(() => {
        filterData && itemsMutate({ ids: filterData.result })
    }, [filterData])

    return (
        <>
            <h1 className='text-center text-4xl font-bold mt-10'>
                Список товаров:
            </h1>
            <Pagination
                currentPageNumber={currentPage}
                totalItemsCount={totalPages}
                pageSize={limit}
                paginate={handlePageChange}
            />
            <div className='container px-10 mx-auto my-3'>
                <FilterDropdown
                    params={params}
                    setParams={setParams}
                    filterMutation={filterMutate}
                />

                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full min-h-[600px] py-2 rounded'>
                    {isPending ? (
                        <ItemSkeleton items={12} />
                    ) : (
                        uniqueItemsData?.map(item => (
                            <Product
                                key={item.id}
                                item={item}
                            />
                        ))
                    )}
                </div>
            </div>
            <Pagination
                currentPageNumber={currentPage}
                totalItemsCount={totalPages}
                pageSize={limit}
                paginate={handlePageChange}
            />
        </>
    )
}

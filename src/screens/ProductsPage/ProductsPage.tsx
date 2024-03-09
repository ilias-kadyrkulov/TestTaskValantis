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
    TGetItemsParams
} from '@/types/services.types'
import 'react-loading-skeleton/dist/skeleton.css'
import {
    FIELDS_KEY,
    FILTER_KEY,
    IDS_KEY,
    ITEMS_KEY
} from '@/constants/constants'
import { useCustomMutation } from '@/hooks/useCustomMutation'

export const ProductsPage: FC = () => {
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
            valantisApi.getIds({ offset: offset, limit: limit })
    )

    const {
        mutate: itemsMutate,
        data: itemsData,
        isPending
    } = useCustomMutation([ITEMS_KEY], ({ ids }: TGetItemsParams) =>
        valantisApi.getItems({ ids: ids })
    )

    const { mutate: fieldsMutate } = useCustomMutation(
        [FIELDS_KEY],
        (field: Fields) => valantisApi.getFields({ field: field }),
        {
            async onSuccess({ result }) {
                setTotalItemsCount(result.length)
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
        async onSuccess({ result }) {
            setTotalItemsCount(result.length)
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
            <h1 className='text-center text-4xl font-bold mb-2'>Список товаров:</h1>
            <Pagination
                currentPageNumber={currentPage}
                totalItemsCount={totalPages}
                pageSize={limit}
                paginate={handlePageChange}
            />
            <div className='container px-3 xs:px-2 mx-auto my-3'>
                <FilterDropdown
                    params={params}
                    setParams={setParams}
                    filterMutation={filterMutate}
                />

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full min-h-[600px] p-2 rounded'>
                    {isPending && <ItemSkeleton items={12} />}
                    {itemsData?.map(item => (
                        <Product
                            key={item.id}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

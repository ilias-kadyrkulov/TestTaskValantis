import { FC, useEffect } from 'react'
import { valantisApi } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import { Pagination } from '@/ui/pagination/Pagination'
import { ItemSkeleton } from '@/common/ItemSkeleton/ItemSkeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import s from './ProductsPage.module.css'

export const ProductsPage: FC = () => {
    const { mutate: idsMutate, data: idsData } = useMutation({
        mutationKey: ['ids'],
        mutationFn: () => valantisApi.getIds({ limit: 50 })
    })

    const {
        mutate: itemsMutate,
        data: itemsData,
        isPending
    } = useMutation({
        mutationKey: ['items'],
        mutationFn: () => valantisApi.getItems({ ids: idsData })
    })

    const {
        mutate: fieldsMutate,
        data: fieldsData
        // isError
    } = useMutation({
        mutationKey: ['fields'],
        mutationFn: () => valantisApi.getFields()
    })

    useEffect(() => {
        idsMutate()

        fieldsMutate()
    }, [])

    useEffect(() => {
        idsData && itemsMutate()
    }, [idsData])

    console.log(idsData, 'ids')
    console.log(itemsData, 'items')
    console.log(fieldsData, 'fields')

    return (
        <div className='container mx-auto mt-10'>
            <div className='flex flex-col items-center mx-4 sm:mx-0 lg:mx-4'>
                <div className='flex w-full justify-end pr-4 mb-5'>
                    <h2>Filter</h2>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full min-h-[600px] p-2 rounded'>
                    {isPending && <ItemSkeleton items={12} />}
                    {itemsData?.map(item => (
                        <div
                            className='grid content-between gap-4 rounded p-4 shadow-inner transition-all duration-500 hover:scale-[1.1] hover:shadow-lg hover:shadow-inner'
                            key={item.id}
                        >
                            <h2 className='text-indigo-950 text-center font-medium'>
                                {item.product}
                            </h2>
                            <div className={s.itemDescBox}>
                                <p className='text-indigo-950'>
                                    {item.brand ? item.brand : 'none'}
                                </p>
                                <p className='text-[#ae3e4c] font-normal'>
                                    {item.price} ₽
                                </p>
                                <p className='text-indigo-950 text-sm italic'>
                                    {item.id}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination totalItems={fieldsData?.length} />
            </div>
        </div>
    )
}

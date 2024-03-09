import { FC } from 'react'
import { TItem } from '@/types/services.types'
import { useParams } from 'react-router-dom'

type TProps = {
    item?: TItem
}

export const SingleProductPage: FC<TProps> = () => {
    const { productId } = useParams()
    console.log(productId)

    return <div>SingleProduct</div>
}
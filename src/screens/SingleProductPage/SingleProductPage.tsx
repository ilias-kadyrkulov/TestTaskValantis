import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { TItem } from '@/types/services.types'

type TProps = {
    item?: TItem
}

export const SingleProductPage: FC<TProps> = () => { //ANCHOR - Не обязательно, страница с подробным описанием товара
    const { productId } = useParams()
    console.log(productId)

    return <div>SingleProduct</div>
}
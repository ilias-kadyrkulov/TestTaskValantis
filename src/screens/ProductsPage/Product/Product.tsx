import { FC } from 'react'
import { TItem } from '@/types/services.types'
import s from './Product.module.css'

type TProps = {
    item: TItem
}

export const Product: FC<TProps> = ({ item }) => {
    return (
        <button
            className={s.itemBox}
            key={item.id}
            aria-label={item.product}
        >
            <span className='text-indigo-950 text-center font-medium text-2xl '>
                {item.product}
            </span>
            <div className={s.itemDescBox}>
                <p className='text-indigo-950 font-light text-xl'>
                    Бренд: {item.brand ? item.brand : '-'}
                </p>
                <p className='text-[#ae3e4c] font-normal text-2xl'>{item.price} ₽</p>
                <h4 className='text-indigo-950 italic max-w-[200px] text-lg'>
                    <p className='not-italic font-bold'>Артикул: </p>
                    {item.id}
                </h4>
            </div>
        </button>
    )
}

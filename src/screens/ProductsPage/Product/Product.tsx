import { FC } from 'react'
import { TItem } from '@/types/services.types'
import s from './Product.module.css'

type TProps = {
    item: TItem
}

export const Product: FC<TProps> = ({ item }) => {
    return (
        <button
            className='grid content-between gap-4 rounded p-4 shadow-inner transition-all duration-500 hover:scale-[1.1] hover:shadow-lg hover:shadow-inner'
            key={item.id}
            aria-label={item.product}
        >
            <span className='text-indigo-950 text-center font-medium'>
                {item.product}
            </span>
            <div className={s.itemDescBox}>
                <p className='text-indigo-950 font-light'>
                    Brand: {item.brand ? item.brand : 'none'}
                </p>
                <p className='text-[#ae3e4c] font-normal'>{item.price} ₽</p>
                <p className='text-indigo-950 text-sm italic max-w-[150px]'>{item.id}</p>
            </div>
        </button>
    )
}

import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

type TProps = {
    items: number
}

export const ItemSkeleton: FC<TProps> = ({ items }) => {
    return Array(items)
        .fill(0)
        .map((_, idx) => (
            <div
                key={idx}
                className='flex flex-col gap-1 shadow-2xl rounded bg-slate-50'
            >
                <Skeleton count={5} height={20} />
            </div>
        ))
}

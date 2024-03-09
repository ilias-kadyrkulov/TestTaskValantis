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
                className='grid content-center gap-4 shadow-2xl rounded bg-[#ae3e4c]'
            >
                <Skeleton count={5} height={20} />
            </div>
        ))
}

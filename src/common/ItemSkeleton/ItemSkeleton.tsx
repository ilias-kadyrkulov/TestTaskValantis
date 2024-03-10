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
                className='grid content-between py-2 shadow-2xl rounded bg-[#ae3e4c]'
            >
                <Skeleton count={3} height={30}/>
                <Skeleton count={5} height={25} />
            </div>
        ))
}

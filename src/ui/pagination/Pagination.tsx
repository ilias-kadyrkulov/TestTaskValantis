import { FC } from 'react'

type TProps = {
    itemsPerPage?: number
    totalItems: number | undefined
    paginate?: () => void
}

export const Pagination: FC<TProps> = ({ totalItems }) => {
    console.log(totalItems)

    return <nav></nav>
}

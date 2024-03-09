import { FC } from 'react'

export const NotFoundPage: FC = () => {
    return (
        <div className='relative h-screen bg-black'>
            <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
                <h1 className='text-slate-50 font-semibold text-3xl'>Page not found!</h1>
            </div>
        </div>
    )
}

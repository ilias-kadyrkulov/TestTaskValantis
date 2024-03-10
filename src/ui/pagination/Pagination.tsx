import { FC, useEffect, useState } from 'react'
import { generatePagination } from '@/helpers'
import clsx from 'clsx'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

type TProps = {
    currentPageNumber: number
    pageSize: number
    totalItemsCount: number
    paginate: (pageNumber: number) => void
}

export const Pagination: FC<TProps> = ({
    currentPageNumber,
    totalItemsCount,
    paginate
}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    // const [pageNumber, setPageNumber] = useState(currentPageNumber)

    // const handlePageNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
    //     setPageNumber(+e.target.value)
    // }

    // const handleEnterDown = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if ((e.key = 'Enter')) {
    //         e.preventDefault()
    //         paginate(currentPageNumber)
    //     }
    // }

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const paginationRange = generatePagination(
        currentPageNumber,
        totalItemsCount,
        windowWidth
    )

    return (
        <>
            <div className='flex items-center justify-center xs:gap-0  sm:gap-1 xs:px-3 sm:px-5 py-10'>
                {currentPageNumber > 1 && ( //NOTE - Предыдущая страница
                    <button
                        className='mr-1 w-10 xs:w-10 md:w-12'
                        onClick={() => paginate(currentPageNumber - 1)}
                    >
                        <FaArrowCircleLeft size={'100%'} />
                    </button>
                )}

                {paginationRange?.map((pageNumber, index) => {
                    //NOTE - Номера страниц
                    if (pageNumber === '...') {
                        return (
                            <span
                                className='text-center border border-slate-400 md:p-4 p-3 rounded text-sm xs:min-w-[50px] transition-colors duration-500'
                                key={index}
                            >
                                ...
                            </span>
                        )
                    } else {
                        return (
                            <button
                                className={clsx(
                                    `border border-slate-400 md:p-4 p-3 rounded text-sm xs:min-w-[50px] transition-colors duration-500`,
                                    {
                                        'bg-[#ae3e4c] text-slate-100':
                                            currentPageNumber === pageNumber,

                                        'hover:bg-[#ae3e4c] hover:text-slate-100':
                                            currentPageNumber !== pageNumber
                                    }
                                )}
                                key={index}
                                onClick={() => paginate(pageNumber as number)}
                                disabled={currentPageNumber === pageNumber}
                            >
                                {pageNumber}
                            </button>
                        )
                    }
                })}

                {currentPageNumber < totalItemsCount && ( //NOTE - Следующая страница
                    <button
                        className='ml-1 w-10 xs:w-10 md:w-12'
                        onClick={() => paginate(currentPageNumber + 1)}
                    >
                        <FaArrowCircleRight size={'100%'} />
                    </button>
                )}
            </div>
            {/* <div className='container mx-auto flex justify-end items-center px-3 pt-3'>
                <h4 className=''>Введите страницу на которую хотите перейти:</h4>
                <input //NOTE - Ввод номера страницы
                    className='w-14 h-8 ml-2 bg-[#ae3e4c] text-slate-100 rounded'
                    type='number'
                    placeholder='Введите страницу на которую хотите перейти'
                    value={pageNumber}
                    min={1}
                    max={totalItemsCount}
                    onChange={e => handlePageNumberInput(e)}
                    onKeyDown={e => handleEnterDown(e)}
                />
            </div> */}
        </>
    )
}

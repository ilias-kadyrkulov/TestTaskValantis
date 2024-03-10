import { TFieldsProps } from '@/types/services.types'
import clsx from 'clsx'
import {
    FC,
    KeyboardEvent,
    MouseEvent,
    useEffect,
    useRef,
    useState
} from 'react'

type TProps = {
    params?: TFieldsProps

    setParams: (value: React.SetStateAction<TFieldsProps>) => void

    filterMutation: (params: TFieldsProps) => void
}

export const FilterDropdown: FC<TProps> = ({
    params,
    setParams,
    filterMutation
}) => {
    const [isDropdownActive, setIsDropdownActive] = useState(false)

    const onDropdownClicked = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setIsDropdownActive(!isDropdownActive)
    }

    const handleOnFilterClicked = () => filterMutation(params || {})

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault
            handleOnFilterClicked()
            setIsDropdownActive(false)
        }
    }

    const handleInputUpdate = (
        field: keyof TFieldsProps,
        value: string | number
    ) => {
        setParams(prevParams => {
            const newParams = { ...prevParams }

            if (value) {
                // @ts-ignore
                newParams[field] = value
            } else {
                delete newParams[field]
            }

            return newParams
        })
    }

    const [filters, setFilters] = useState('')

    const dropdownRef = useRef(null)

    useEffect(() => {
        const truthyKeys = Object.entries({ ...params })
            .filter(([_, value]) => Boolean(value))
            .map(([key]) => key)
        const joinedKeys = truthyKeys.join(', ')
        setFilters(joinedKeys)
    }, [params])

    useEffect(() => {
        const handleBodyClick = (event: any) => {
            if (
                dropdownRef.current &&
                //@ts-ignore
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownActive(false)
            }
        }

        document.addEventListener('mousedown', handleBodyClick)

        return () => {
            document.removeEventListener('mousedown', handleBodyClick)
        }
    }, [isDropdownActive])

    return (
        <div
            className='mb-10 ml-3 float-left'
            ref={dropdownRef}
        >
            <button
                className={clsx(
                    'border border-slate-400 p-1 md:p-3 md:text-lg rounded-lg bg-[#ae3e4c] text-slate-200 transition-[border-radius] duration-300',
                    {
                        'rounded-b-none': isDropdownActive
                    }
                )}
                onClick={onDropdownClicked}
            >
                Фильтровать по: <strong>{filters}</strong>
            </button>
            <div
                className={clsx(
                    'absolute flex gap-1 rounded-lg divide-x max-w-[300px] w-full transition-all',
                    {
                        '-z-10 -translate-y-2 opacity-0  duration-500':
                            !isDropdownActive,
                        'z-10 bg-[#ae3e4c] translate-y-0 opacity-100 duration-300 rounded-l-none':
                            isDropdownActive
                    }
                )}
            >
                <div className='flex flex-col w-full gap-2 p-2'>
                    <input
                        className='bg-transparent placeholder:italic text-slate-100'
                        type='text'
                        placeholder='Название...'
                        value={params?.product}
                        onChange={e =>
                            handleInputUpdate('product', e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                    />
                    <input
                        className='bg-transparent placeholder:italic text-slate-100'
                        type='text'
                        placeholder='Бренд...'
                        value={params?.brand}
                        onChange={e =>
                            handleInputUpdate('brand', e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                    />
                    <h3 className='text-slate-200 font-medium'>
                        Цена: {params?.price} ₽
                    </h3>
                    <input
                        className='bg-transparent placeholder:italic text-slate-100'
                        type='number'
                        placeholder='Цена...'
                        value={params?.price}
                        onChange={e =>
                            handleInputUpdate('price', Number(e.target.value))
                        }
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className='border rounded transition-colors duration-300 p-2 hover:bg-slate-200'
                        onClick={handleOnFilterClicked}
                    >
                        Фильтровать
                    </button>
                </div>
            </div>
        </div>
    )
}

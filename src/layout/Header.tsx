import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import logo from '@/assets/valantis.webp'

export const Header: FC = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        let scrollTimeout: any

        const handleScroll = () => {

            cancelAnimationFrame(scrollTimeout)

            scrollTimeout = requestAnimationFrame(() => {
                const scrolled = window.scrollY > 0
                setIsScrolled(scrolled)
            })
        }

        document.addEventListener('scroll', handleScroll)

        return () => {
            document.removeEventListener('scroll', handleScroll)
            cancelAnimationFrame(scrollTimeout)
        }
    }, [])

    return (
        <header
            className={clsx(
                'sticky top-0 flex justify-center transition-all py-2',
                {
                    'bg-[#1f1f1f] z-50': isScrolled
                }
            )}
        >
            <div>
                <Link to='/'>
                    <img
                        className={clsx(
                            'translate-y-0 transition-all duration-500 rounded w-24',
                            {
                                'translate-y-2 transition-all duration-500 w-20':
                                    isScrolled
                            }
                        )}
                        src={logo}
                        alt='Logo'
                        aria-label="The website's logo"
                    />
                </Link>
            </div>
        </header>
    )
}

import { useEffect, useRef, useState } from 'react'
import { Navigation } from './navigation/Navigation'
import { FaArrowCircleUp } from 'react-icons/fa'
import clsx from 'clsx'

function App() {
    const [isScrolled, setIsScrolled] = useState(false)
    const arrowRef = useRef(null)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        let scrollTimeout: any

        const handleScroll = () => {
            cancelAnimationFrame(scrollTimeout)

            scrollTimeout = requestAnimationFrame(() => {
                const scrolled = window.scrollY > 300
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
        <>
            <Navigation />

            <button
                ref={arrowRef}
                onClick={scrollToTop}
                className={clsx(
                    'fixed -z-10 opacity-0 bottom-5 right-5 transition-all duration-300',
                    {
                        'z-10 opacity-100':
                            isScrolled
                    }
                )}
            >
                <FaArrowCircleUp size={50} />
            </button>
        </>
    )
}

export default App

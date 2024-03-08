import { FC } from "react"
import logo from '@/assets/valantis.webp'

const Header: FC = () => {
  return (
    <header className="flex px-5 py-3 justify-center">
        <img className="block align-middle h-10" src={logo} alt="Logo" />
    </header>
  )
}

export default Header
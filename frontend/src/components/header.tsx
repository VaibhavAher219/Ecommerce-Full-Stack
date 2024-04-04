import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaShoppingBag, FaSignInAlt, FaUser } from 'react-icons/fa'

const user = {_id:"abcd", role:"admin"}
const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <nav>
        <Link to={'/'}>Home</Link>
        <Link to={'/search'}>
            <FaSearch/>
        </Link>
        <Link to ={'/cart'}>
            <FaShoppingBag></FaShoppingBag>
        </Link>
        {
            user?._id?(
                <>
                <button>
                    <FaUser></FaUser>
                </button>
                <dialog open={true}>
                    <div>
                        {
                            user.role==="admin" && (
                                <Link to={'/admin/dashboard'}>Admin</Link>
                            )
                        }
                    <Link to={'/orders'}>Orders</Link>


                    </div>
                </dialog>
                </>
            ): <Link to ={'/cart'}>
               <FaSignInAlt></FaSignInAlt> </Link>

        }
        



    </nav>
  )
}

export default Header

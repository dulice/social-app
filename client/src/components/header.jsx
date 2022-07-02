import { MdHome, MdAddBox, MdSearch, MdLogout } from 'react-icons/md';
import { IoMdCompass, IoMdHeart } from 'react-icons/io'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { AiOutlineSetting } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi'
import { userAction } from '../redux/userSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const [search, setSearch] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?q=${search}`);
        setSearch('');
    }
    const handleProfileClick = () => {
        navigate(`/profile/${user.username}`);
    }
  return (
    <div className='border-b-gray-200 border-b-2 py-3 fixed top-0 w-full bg-white nav z-10'>
        <div className="max-w-5xl mx-auto px-3">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 md:col-span-4 flex justify-start font-mono font-bold text-xl">Instagram</div>
                <div className="col-span-6 md:col-span-4 hidden md:flex md:justify-end">
                    <form onSubmit={handleSubmit}>
                        <div className="relative">
                            
                            <input 
                                type="text"
                                placeholder='Search...'
                                value={search}
                                onChange={(e)=> setSearch(e.target.value)}
                                className="rounded-md border outline-violet-600 block pl-10 p-2.5 w-full px-3 py-2 border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <button type='submit' className='bg-transparent search-btn text-xl'><MdSearch /></button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-span-9 md:col-span-4 justify-end flex">
                    <NavLink  className="inline-block ml-3 text-2xl" to="/">
                        <MdHome />
                    </NavLink>
                    <NavLink className="inline-block ml-3 text-2xl" to="/chat">
                        <FiSend />
                    </NavLink>
                    <NavLink className="inline-block ml-3 text-2xl" to="/uploadpost">
                        <MdAddBox />
                    </NavLink>
                    <NavLink className="inline-block ml-3 text-2xl" to="/explore">
                        <IoMdCompass />
                    </NavLink>
                    <NavLink className="inline-block ml-3 text-2xl" to="/activity">
                        <IoMdHeart />
                    </NavLink>

                    <div className="text-right">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                            <Menu.Button>
                                {user && user.profilePicture ? (
                                    <img className='mx-3 w-7 h-7 object-cover rounded-full' src={user.profilePicture} alt="" />
                                ): (
                                    <img className='mx-3 w-7 h-7 object-cover rounded-full' src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="" />
                                )}
                            </Menu.Button>
                            </div>
                            <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                            >
                            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 ">
                                <Menu.Item>
                                    {({ active }) => (
                                    <button
                                        onClick={handleProfileClick}
                                        className={`${
                                        active ? 'bg-gray-200' : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active ? (
                                        <FaUser
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        ) : (
                                        <FaUser
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        )}
                                        Profile
                                    </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link to="/accounts/edit">
                                            <button
                                                className={`${
                                                active ? 'bg-gray-200' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                <AiOutlineSetting
                                                    className="mr-2 h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                                Setting
                                            </button>
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                    <button
                                        onClick={() => dispatch(userAction.logout())}
                                        className={`${
                                        active ? 'bg-gray-200' : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <MdLogout
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        Logout
                                    </button>
                                    )}
                                </Menu.Item>
                                </div>
                            </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header
import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const name = useSelector(state=>state.states.name)
  const avatar = useSelector(state=>state.states.avatar)

  return (
    <section className=' z-50 fixed top-0 bg-pink w-full h-16 flex flex-row justify-between items-center'>
      <span className=' text-white ml-[3%] text-2xl font-bold'>BrainWave</span>
      <span className='flex mr-[3%] items-center'>
        <span className='mr-2 text-white'>{name}</span>
        <span className=' rounded-full h-12 w-12 bg-white'><img src={avatar} alt="" /></span>
      </span>
    </section>
  )
}

export default Navbar
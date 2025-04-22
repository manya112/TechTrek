import React from 'react'
import { useOutlet } from 'react-router-dom'
// import Navbar from './Navbar';
import Navbar from './Navbar';

const Layout = () => {
  const outlet = useOutlet();
  if (!outlet) return <div>loading</div>;
  return (
    <>
    {/* <Navbar/> */}
    <Navbar/>
    {outlet}
    </>
  )
}

export default Layout
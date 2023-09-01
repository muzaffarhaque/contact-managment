import React, { useState } from 'react';
import './layout.scss';
import {Outlet} from 'react-router-dom';
import {Header, SideNave} from '../../components';
const Layout : React.FC = () => {
    const [show,setShow]=useState(false);
    const showNav=()=>{
        setShow(!show)
    }
    return (
        <div>
            <div className="container">
                <Header openNav={showNav}/>
                <div className="oulate-main-wrapper d-flex ">
                        <SideNave openNav={showNav} show={show}/>
                    <div className="right-outlate-frame w-100">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Layout;
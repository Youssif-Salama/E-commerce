import React, { useContext, useEffect, useState } from 'react'; import { Link, useNavigate } from 'react-router-dom'; import { CartContext } from '../../context/CartContextProvider';
const Navbar = () => {
    // usecontext
    let { noOfCartItems } = useContext(CartContext);
    let navigate = useNavigate()
    // // saving variable that containe userEncodedToken that help me to define user situation
    const navUserToken = localStorage.getItem('userToken');
    function actionsOnProfileLinks() {
        const ProfileList = document.querySelector(".registrationLinksnull ul .profileList .logout");
        const profileParent = document.querySelector(".registrationLinksnull ul .profileList")

        profileParent.addEventListener("mouseenter", () => {
            ProfileList.style.display = "block";
        });
        profileParent.addEventListener("mouseleave", () => {
            ProfileList.style.display = "none";
        });

        ProfileList.addEventListener("click", () => {
            navigate("/");
            localStorage.clear();
            // Alternatively, you can set the userToken to null in localStorage
            // localStorage.setItem("userToken", null);
        });
    }
    // //   active class to each li a
    // function addActive() {
    //     const links = document.querySelectorAll("nav ul li a");
    //     links.forEach(link => {
    //         link.addEventListener("click", _ => {
    //             links.forEach(nonactivelink => {
    //                 nonactivelink.classList.remove("active");
    //             })
    //             link.classList.add("active");
    //         })
    //     })
    // }
    //  action on sideBarIcon
    function actionsOnSideBarIcon() {
        const sideBarIcon = document.querySelector(".sideBarIcon");
        const menuSideBar = document.querySelector(".menuSideBar");
        sideBarIcon.addEventListener("click", _ => {
            menuSideBar.style.left = "0";
        })
    }
    // delete all action on click window but not target
    function deleteAllAction() {
        const sideBarIcon = document.querySelector(".sideBarIcon");
        const menuSideBar = document.querySelector(".menuSideBar");
        window.addEventListener("click", e => {
            if (e.target !== sideBarIcon) {
                menuSideBar.style.left = "-100%";
            }
        });
    }
    useEffect(_ => {
        // this case define that when u are logged in and token != null don't call the function else call it 
        // addActive();
        // if (!navUserToken) {
        //     // no thing
        // } else {
        //     actionsOnProfileLinks();
        //     actionsOnSideBarIcon();
        //     deleteAllAction();
        // }
        if(!navUserToken)
        {

        }
        else{
            actionsOnProfileLinks();
        }
    }, [])
    return (
        <div className='navBar p-2'>
            {
                !navUserToken ?
                    <div className="container d-flex align-items-center justify-content-between">

                        <header className="logonull col-10 m-auto">
                            <h1 className='m-auto h3'>e-commerce</h1>
                        </header>

                        <nav className="registrationLinksnull">
                            <ul className="d-flex align-items-center justify-content-around m-auto">
                                <li className='m-1'>
                                    <Link className='p-1' to={"/"}>singin</Link>
                                </li>
                                <li className='m-1'>
                                    <Link className='p-1' to={"signup"}>signup</Link>
                                </li>
                            </ul>
                        </nav>

                    </div> :
                    <div className="container p-1 row m-auto">
                        {/* menu for responsivity */}

                        <div className="navMenu col-5">
                            <i className="fa-solid fa-ellipsis-vertical sideBarIcon"></i>

                            <div className="container-fluid">
                                <nav className="menuSideBar m-0 p-1">
                                    <ul className="p-1 w-100 h-100">
                                        <li>
                                            <Link className="p-1" to={"home"}>home</Link>
                                        </li>

                                        <li>
                                            <Link className="p-1" to={"about"}>about</Link>
                                        </li>

                                        <li>
                                            <button className="btn p-0 btn-ouline-info">
                                                <Link className="p-1 cart" to={"cart"}>Cart <span className='cartCounter'>{noOfCartItems}</span></Link>
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="profile mt-auto p-2">
                                        <div>profile <i className="fa-regular fa-user"></i>
                                        </div>
                                    </div>
                                </nav>
                            </div>

                        </div>

                        <header className="logonnull col-md-4 col-6 m-auto">
                            <h1 className='h3'>
                                <a href="home">
                                    e-commerce
                                </a>
                            </h1>
                        </header>

                        <nav className="registrationLinksnull col-md-6 text-end m-auto">
                            <ul className='d-flex align-itens-center justify-content-around p-2 m-0'>
                                <li>
                                    <Link className="p-1 /*active*/" to={"home"}>home</Link>
                                </li>

                                <li>
                                    <Link className="p-1" to={"about"}>about</Link>
                                </li>
                                <li>
                                    <button className="btn p-0">
                                        <Link className="p-1 cart" to={"cart"}>Cart<span className='cartCounter'>{noOfCartItems}</span></Link>
                                    </button>
                                </li>
                                <li className='profileList'>
                                    <div>
                                        <i className="fa-regular fa-user">
                                        </i>
                                    </div>
                                    <div className="logout">
                                        logout
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
            }
        </div>
    );
}

export default Navbar;

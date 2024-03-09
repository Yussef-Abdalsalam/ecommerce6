import React, { useContext } from 'react'
import styles from './NavBar.module.css';
import img1 from '../../Assets/images/freshcart-logo.svg';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { tokenContext } from '../../Context/TokenContext';
import Swal from 'sweetalert2';
import { ietmCartContext } from '../../Context/IetmCart';
import { ietmWishListContext } from '../../Context/IetmWishList';
import { nameContext } from '../../Context/UserName';


export default function NavBar() {
  let { token, setToken } = useContext(tokenContext);
  let { userName } = useContext(nameContext);
  let { cart } = useContext(ietmCartContext);
  let { wishList } = useContext(ietmWishListContext);
  let navigate = useNavigate()


  function LogOut() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, LogOut it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userToken")
        setToken(null)
        navigate("/Login")
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });

  }

  let name = localStorage.getItem("username");
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top box-shdo ">
        <div className="container py-1">
          <Link aria-label="logo hike" to="">
            <img src={img1} alt="" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {token ?
              <ul className="navbar-nav fw-bold me-auto py-1 mb-2 mb-lg-0">

                <li className="nav-item px-1">
                  <NavLink className="nav-link" aria-current="page" to="home">Home</NavLink >
                </li>

                <li className="nav-item px-1">
                  <NavLink className="nav-link" to="products">Products</NavLink>
                </li>
                <li className="nav-item px-1">
                  <NavLink className="nav-link" to="catrgories">Catrgories </NavLink>
                </li>
                <li className="nav-item px-1">
                  <NavLink className="nav-link" to="brands">Brands</NavLink>
                </li>

                <li className="nav-item px-1">
                  <NavLink className="nav-link" to="allorders"> Orders</NavLink>
                </li>


              </ul>
              :
              <ul className="navbar-nav fw-bold me-auto py-1 mb-2 mb-lg-0">
                <li className="nav-item px-1">
                  <NavLink className="nav-link" aria-current="page" to="">Home</NavLink >
                </li>
              </ul>
            }

            <ul className="navbar-nav fw-bold ms-auto mb-2 mb-lg-0">
              {token ?
                <div className="  d-flex justify-content-between">

                  <li className="nav-item">
                    <NavLink className="nav-link position-relative" to="wishList"><i className={`${styles.icon2} text-main fa-solid fa-heart`}></i>
                      {wishList?.data?.data?.length > 0 || wishList?.length > 0 ? <span className={`${styles.span}  translate-middle bg-main rounded-circle font-sm`}>{wishList?.data?.data?.length}{wishList?.length}</span> : ""}  </NavLink>
                  </li>

                  <li className="nav-item mx-1 px-4">
                    <NavLink className="nav-link position-relative" to="cart"> <i className={`${styles.icon} text-main fa-solid fa-cart-shopping icon`}></i>
                      {cart?.data?.numOfCartItems > 0 || cart?.numOfCartItems > 0 ? <span className={`${styles.span}  translate-middle bg-main rounded-circle font-sm`}>{cart?.data?.numOfCartItems}{cart?.numOfCartItems}</span> : ""} </NavLink>
                  </li>

                  <li className="nav-item px-4 position-relative">
                    <div className='btn-group'>
                      <button type="button" className="btn  dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className={`${styles.icon1} text-main fa-solid fa-user`}></i>
                      </button>
                      <ul className="dropdown-menu py-3">
                        <li><Link className={`${styles.botn} p-2`} to={"/updatePassword"}>Update Password</Link></li>
                        <hr />
                        <li><Link className={`${styles.botn} p-2`} to={"/forgot"}>Forget Password</Link></li>
                        <hr />

                        <li className={`${styles.botn} text-center`} ><button className={`${styles.botn} btn fw-bold`} onClick={LogOut} >LogOut</button></li>

                      </ul>
                      {userName ? <div className=" pt-2 px-2 text-main">{userName}</div> : <div className=" pt-2 px-2 text-main">{name}</div>}
                    </div>
                  </li>

                </div>

                :
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="register">Register</NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="login">Login</NavLink>
                  </li>
                </>
              }
            </ul>

          </div>
        </div>
      </nav >

    </>
  )
}




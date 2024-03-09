import axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { wishListContext } from '../../Context/WishListContext';
import { cartContext } from '../../Context/CartContext';
import { RotatingLines } from 'react-loader-spinner';
import { Toaster } from 'react-hot-toast';

export default function BrandsDetails() {
    let { id } = useParams();

    function getpranProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    let { addToCart } = useContext(cartContext);
    function addCart(id) {
        addToCart(id)
    }

    let { addToWishList } = useContext(wishListContext);
    function addWishList(id) {
        addToWishList(id)
    }

    let { data, isLoading } = useQuery("getpranProducts", getpranProducts);

    let dta = data?.data?.data?.filter((prodct) => prodct.brand._id === id)
    console.log(dta);

    return (
        <>
            <div><Toaster /></div>
            <div className="container py-5 mt-5">
                <div className="row">
                    {isLoading ?
                        <div className=" d-flex justify-content-center mt-5 pt-5">
                            <div className="mt-5 pt-5">
                                <RotatingLines
                                    visible={true}
                                    height="96"
                                    width="96"
                                    color="grey"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    ariaLabel="rotating-lines-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            </div>
                        </div> : ""}

                    {data?.data?.data?.filter((prodct) => prodct.brand._id === id)
                        .map((el) => (
                            <div key={el.id} className=" col-xl-3 col-md-4 col-sm-6">
                                <div className="product py-1 px-3 position-relative ">
                                    <div onClick={() => addWishList(el.id)} className={`addWishList cursor-pointer fa-2x position-absolute`}><i className="fa-solid fa-heart"></i></div>
                                    <Link to={`/details/` + el.id}>
                                        <img className='w-100' src={el.imageCover} alt="" />
                                        <p className='text-main font-sm p-1'>{el.description.split(" ").slice(0, 1).join(" ")}</p>
                                        <h2 className={``} >{el.title.split(" ").slice(0, 2).join(" ")}</h2>
                                        <div className=" pb-4 d-flex justify-content-between ">
                                            <p>{el.price} EGP</p>
                                            <p>{el.ratingsAverage}<i className='fa fa-star rating-color'></i></p>
                                        </div>
                                    </Link>

                                    <div className={` text-center`}>
                                        <button onClick={() => addCart(el.id)} className='btn bg-main text-white'> <i className="fa-solid fa-plus"></i> add to cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    <div>{dta?.length === 0 || dta == [] ? <h2 className=' alert alert-warning text-center my-5'>No products in yuor Catgories Details</h2> : ""}</div>
                </div>
            </div>

        </>
    )
}

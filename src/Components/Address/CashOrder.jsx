import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup';
import { ietmCartContext } from '../../Context/IetmCart';

export default function CashOrder() {
    const [isLoading, setIsLoading] = useState(false)
    let { setCart } = useContext(ietmCartContext);
    let { cartId } = useParams();
    let navigate = useNavigate()


    let mySchema = Yup.object(
        {
            details: Yup.string().required("Details is required"),
            sity: Yup.string().required("Sity is required"),
            phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Phone is not valid"),
        }
    )

    let formik = useFormik({
        initialValues: {
            details: "",
            sity: "",
            phone: "",

        }, validationSchema: mySchema
        , onSubmit: (values) => {
            cashOrder(values)
        }
    })

    async function cashOrder(shippingAddress) {
        setIsLoading(true)
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
                shippingAddress
            }, {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            })
            setIsLoading(false)
            navigate("/allorders")
            setCart(0)

        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="container py-5">
                <div className="w-75 mt-5 mx-auto">
                    <form onSubmit={formik.handleSubmit}>
                        <h2>Create Cash Order :</h2>

                        <label htmlFor="details">Details : </label>
                        <input type="text" name='details' id='details' className='form-control mb-2'
                            onChange={formik.handleChange} value={formik.values.details} onBlur={formik.handleBlur} />
                        {formik.touched.details && formik.errors.details ? <div className="alert alert-danger">{formik.errors.details}</div> : ""}

                        <label htmlFor="sity">Sity : </label>
                        <input type="text" name='sity' id='sity' className='form-control mb-2'
                            onChange={formik.handleChange} value={formik.values.sity} onBlur={formik.handleBlur} />
                        {formik.touched.sity && formik.errors.sity ? <div className="alert alert-danger">{formik.errors.sity}</div> : ""}

                        <label htmlFor="phone">Phone : </label>
                        <input type="tel" name='phone' id='phone' className='form-control mb-2'
                            onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} />
                        {formik.touched.phone && formik.errors.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : ""}


                        {isLoading ? <button type='submit' className='btn bg-main text-white'><i className='fa fa-spin fa-spinner'></i></button>
                            : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Cash Order</button>}


                    </form>
                </div>
            </div>

        </>
    )
}


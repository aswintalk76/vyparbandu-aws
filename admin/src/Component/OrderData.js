import { Link } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const OrderData = () => {
    const [documentList, setDocumentList] = useState();

    const getList = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PORT}/admin/order/getOrder`);
            const data = await response.json();
            if (response.status === 200) {
                setDocumentList(data)
            }
            console.log('Data received:', data);

        } catch (e) {
            console.log(e, 'error')
        }

    }
    useEffect(() => {

        getList();

    }, [])

    const DeleteData = async (dataId) => {
        let url = `${process.env.REACT_APP_PORT}/admin/order/deleteOrder`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: dataId })
            });
            if (response.status === 200) {
                toast.success("Delete data Sucesfully!")
                getList();
            }
        } catch (e) {
            console.log(e, 'error')
        }


    }
    const StatusChange = async (status,dataId) => {
        console.log(status,dataId)
        let url = `${process.env.REACT_APP_PORT}/admin/order/changeStatus`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: dataId , status:status })
            });
            if (response.status === 200) {
                toast.success("Status Change Sucesfully!")
                getList();
            }
        } catch (e) {
            console.log(e, 'error')
        }


    }


    return (
        <>
            <Header />
            <main id='main' className='main'>
                <div className='pagetitle'>
                    <h1>Order Data</h1>

                    <nav>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <Link to='/'>

                                    Home
                                </Link>
                            </li>
                            <li className='breadcrumb-item'>

                                Data Pages
                            </li>
                            <li className='breadcrumb-item active'>Order Data</li>
                        </ol>
                    </nav>
                </div>
                <section className='section'>
                    <div className='row'>

                        <div className='card'>
                            <div className='card-body'>
                                {/* <div style={{ display: 'flex', justifyContent: 'end' }}>

                                    <h5 className='card-title'>



                                        <button type="button" class="btn btn-outline-primary" >Add Document</button>



                                    </h5>
                                </div> */}


                                <table className='table'>
                                    <thead>
                                        <tr>

                                            <th scope='col'> User Name</th>
                                            <th scope='col'> User Email</th>
                                            <th scope='col'>Package Name</th>
                                            <th scope='col'>Package Amount</th>
                                            <th scope='col'>Status</th>
                                            {/* <th scope='col'>Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            documentList && documentList.map((item, index) => {
                                                return (
                                                    <>

                                                        <tr>

                                                            <td>{item?.userData?.name}</td>
                                                            <td>{item?.userData?.email}</td>
                                                            <td>{item?.package?.package}</td>
                                                            <td>{item?.package?.amount}</td>
                                                            <td>

                                                                <select className='form-select' onChange={(e)=>{StatusChange(e.target.value , item._id)}}>
                                                                    <option value='pending' selected={item.status === "pending" ? true : false } ><span class="badge badge-info">pending</span></option>
                                                                    <option value='complete' selected={item.status === "complete" ? true : false }><span class="badge badge-info">complete</span></option>
                                                                    <option value='failed' selected={item.status === "failed" ? true : false }><span class="badge badge-info">failed</span></option>
                                                                </select>
                                                              
                                                            </td>
                                                            {/* <td>



                                                                <button type="button" class="btn btn-sm btn-danger" onClick={() => { DeleteData(item._id) }}><i class="bi bi-trash"></i></button>
                                                            </td> */}


                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }

                                    </tbody>

                                </table>




                            </div>
                        </div>

                    </div>
                </section>

            </main>
            <Footer />
        </>
    )
}

export default OrderData
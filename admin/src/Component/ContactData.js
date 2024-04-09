import { Link } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const ContactData = () => {
    const [documentList, setDocumentList] = useState();

    const getList = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PORT}/admin/getConatctUsExpertCall`);
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
        let url = `${process.env.REACT_APP_PORT}/admin/ConatctUsdelete`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dataId: dataId })
            });
            if (response.status === 200) {
                toast.success("Delete data Sucesfully!")
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
                    <h1>Export Call List</h1>

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
                            <li className='breadcrumb-item active'>Export Call List</li>
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

                                            <th scope='col'> First Name</th>
                                            <th scope='col'> Last Name</th>
                                            <th scope='col'> Email</th>
                                            <th scope='col'>Phone Number</th>
                                            <th scope='col'>Doubts</th>
                                            <th scope='col'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            documentList && documentList.map((item, index) => {
                                                return (
                                                    <>

                                                        <tr>

                                                            <td>{item.firstname}</td>
                                                            <td>{item.lastname}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.number}</td>
                                                            <td>{item.doubt}</td>
                                                            <td>



                                                                <button type="button" class="btn btn-sm btn-danger" onClick={()=>{DeleteData(item._id)}}><i class="bi bi-trash"></i></button>
                                                            </td>


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

export default ContactData
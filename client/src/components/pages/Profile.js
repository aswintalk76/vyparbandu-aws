import { useEffect, useState } from "react"
import Header from "./Header"
import { useLocation, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import uploadFile from "../upload/uploadFile"
import deleteFile from "../upload/deleteFile"
import Footer from "./Footer"


const Profile = () => {
    const [active, setActive] = useState(0)
    const [email, setEmail] = useState()
    const [orderDetails, setOrderDetails] = useState()
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState()
    const [documentList, setDocumentList] = useState();
    const [selectDocument, setSelectDocument] = useState()
    const [file, setFile] = useState()
    const [profileImage, setProfileImage] = useState()
    const [disble, setDisble] = useState(false)
    const [document, setDocument] = useState()
    const [modalActive, setModalActive] = useState(false);
    const [infoModal, setInfoModal] = useState(false);
    const [useData, setUserData] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    const openModal = () => {
        setModalActive(true);
    };

    const closeModal = () => {
        setModalActive(false);
        setInfoModal(false)
        setProfileModal(false)
    };


    const navigate = useNavigate();

    const Logout = () => {

        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("number");
        localStorage.removeItem("id");
        navigate('/')
    }

    const getData = async (id) => {
        let url = `${process.env.REACT_APP_PORT}/admin/getuser`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: id })
            });
            const data = await response.json();
            console.log(data.user)
            console.log(response.status)
            if (response.status === 200) {
                setUserData(data?.user)
                setDocument(data?.user?.documents)

            } else {
                toast.error(data.error)
            }
        } catch (e) {
            toast.error(e)
        }
    }

    const getList = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PORT}/admin/documentlist/list`);
            const data = await response.json();
            if (response.status === 200) {
                setDocumentList(data)
            }
            // console.log('Data received:', data);

        } catch (e) {
            console.log(e, 'error')
        }

    }

    const getOrder = async () => {
        let userId = localStorage.getItem('id')

        let url = `${process.env.REACT_APP_PORT}/admin/order/getUserOrder`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userId })
            });
            const data = await response.json();
            if (response.status === 200) {
                setOrderDetails(data)

                // toast.success('Order Created Successfully')

            } else {
                toast.error('somthing get wrong')
            }
        } catch (e) {
            toast.error(e)
        }

    }


    useEffect(() => {
        setEmail(localStorage.getItem('email'))
        setName(localStorage.getItem('name'))
        setPhone(localStorage.getItem('number'))
        setId(localStorage.getItem('id'))
        getData(localStorage.getItem('id'))
        // setDocument([{ image: "img", name: 'name' }, { image: "img", name: 'name' }])
        getList()
        getOrder()
    }, [])

    const Submit = async () => {
        let url = `${process.env.REACT_APP_PORT}/admin/editAccount`


        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, name: name, number: phone, id: id })
            });
            const data = await response.json();
            console.log(data.user)
            console.log(response.status)
            if (response.status === 200) {
                console.log(data)
                localStorage.setItem("email", data.user.email);
                localStorage.setItem("id", data.user._id);
                localStorage.setItem('number', data.user.number);
                localStorage.setItem('name', data.user.name);

                toast.success("Save Data Sucesfully!")

                setEdit(false)

            } else {
                toast.error(data.error)
            }
        } catch (e) {
            toast.error(e)

            console.log(e, 'error')
        }

    }



    const SaveData = (updatedItem) => {
        setDocument(document.map(item => {
            if (item._id === updatedItem._id) {
                return updatedItem;
            }
            return item;
        }));
    };

    const callBack = () => {
        setDisble(false)
    }

    const AddDocument = async () => {
        let url = `${process.env.REACT_APP_PORT}/admin/addDocuments`
        console.log(file)
        if (file && selectDocument !== "0") {
            setDisble(true)
            // const fileName = file.name + Date.now();
            // await uploadFile(fileName, file, callBack)
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", selectDocument);
            formData.append("id", id);

            try {
                const response = await fetch(url, {
                    method: "POST",
                    // headers: { "Content-Type": "application/json" },
                    body: formData,
                });
                const data = await response.json();
                // console.log(data.user)
                // console.log(response.status)
                if (response.status === 200) {
                    setDocument(data?.user?.documents)
                    setDisble(false)
                    toast.success("Save Data Sucesfully!")
                    closeModal()

                } else {
                    toast.error(data.error)
                }
            } catch (e) {
                toast.error(e)

                console.log(e, 'error')
            }

        }
    }

    const ChangeProfile = async () => {
        let url = `${process.env.REACT_APP_PORT}/admin/profileImage`
        if (profileImage) {
            setDisble(true)
            // const fileName = profileImage?.name + Date.now();
            // await uploadFile(fileName, profileImage, callBack)
            const formData = new FormData();
            formData.append("file", profileImage);
            formData.append("id", id);

            try {
                const response = await fetch(url, {
                    method: "POST",
                    body: formData,
                });
                const data = await response.json();
                console.log(data.user)
                console.log(response.status)
                if (response.status === 200) {
                    setDisble(false)
                    setUserData(data?.user)
                    toast.success("Save Data Sucesfully!")
                    closeModal()

                } else {
                    toast.error(data.error)
                }
            } catch (e) {
                toast.error(e)

                console.log(e, 'error')
            }

        }
    }


    const DeleteDocument = async (item) => {
        let url = `${process.env.REACT_APP_PORT}/admin/deleteDocument`
        console.log(item)
        setDisble(true)
        await deleteFile(item.image, callBack);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: id, docId: item._id })
            });
            const data = await response.json();
            console.log(data.user)
            console.log(response.status)
            if (response.status === 200) {
                setDocument(data?.user?.documents)
                toast.success("Save Data Sucesfully!")


            } else {
                toast.error(data.error)
            }
        } catch (e) {
            toast.error(e)

            console.log(e, 'error')
        }
    }


    console.log(useData, 'useData')

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <>
            <div style={{ backgroundColor: "#eee", height: "100vh" }}>

                <Header login={email} />

                {modalActive && (
                    <>
                        <div className="modal-overlay" onClick={closeModal}></div>
                        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">

                            <section className="vh-100 container_body">
                                <div className="container py-5 h-100">
                                    <div className="row px-3 d-flex align-items-center justify-content-center h-100">
                                        <div className="col-md-10 w-auto col-lg-10 col-xl-9 card flex-row mx-auto px-0">
                                            {/* <div className="img-left d-none d-md-flex">
                                            <div>

                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                                    alt="login form" class="img-fluid" style={{ height: "100%" }} />
                                            </div>
                                        </div> */}

                                            <div className="card-body">
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{ fontSize: "30px" }} onClick={closeModal}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>


                                                <h2 class="title text-center mt-4 modal_heading" >
                                                    Add  Document
                                                </h2>
                                                <div class="form-box px-3">

                                                    <div class="form-input">
                                                        <select class="form-select" aria-label="Default select example" style={{ borderRadius: "30px" }} onChange={(e) => { setSelectDocument(e.target.value) }}>
                                                            <option value='0'>Choose Document</option>

                                                            {
                                                                documentList?.map((item) => {
                                                                    return (
                                                                        <>

                                                                            <option value={item.name}>{item.name}</option>

                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div class="mb-3 mt-3">
                                                        <input class="form-control" type="file" id="formFile" style={{ borderRadius: "30px" }} onChange={(e) => { setFile(e.target.files[0]) }} />
                                                    </div>

                                                    <div class="mb-3">

                                                        <button type="submit" class="btn btn-block text-uppercase modal_button_bg" onClick={() => { AddDocument() }} disabled={disble}>
                                                            {disble ?
                                                                <div class="spinner-border text-warning" role="status">
                                                                    <span class="sr-only">Loading...</span>
                                                                </div>
                                                                :

                                                                <span>Submit</span>
                                                            }

                                                        </button>
                                                    </div>


                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                    </>
                )}
                {profileModal && (
                    <>
                        <div className="modal-overlay" onClick={closeModal}></div>
                        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">

                            <section className="vh-100 container_body">
                                <div className="container py-5 h-100">
                                    <div className="row px-3 d-flex align-items-center justify-content-center h-100">
                                        <div className="col-md-10 w-auto col-lg-10 col-xl-9 card flex-row mx-auto px-0">


                                            <div className="card-body">
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{ fontSize: "30px" }} onClick={closeModal}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>


                                                <h2 class="title text-center mt-4 modal_heading" >
                                                    Change Profile Image
                                                </h2>
                                                <div class="form-box px-3">


                                                    <div class="mb-3 mt-3">
                                                        <input class="form-control" type="file" id="formFile" style={{ borderRadius: "30px" }} onChange={(e) => { setProfileImage(e.target.files[0]) }} />
                                                    </div>

                                                    <div class="mb-3">

                                                        <button type="submit" class="btn btn-block text-uppercase modal_button_bg" onClick={() => { ChangeProfile() }} disabled={disble}>
                                                            {disble ?
                                                                <div class="spinner-border text-warning" role="status">
                                                                    <span class="sr-only">Loading...</span>
                                                                </div>
                                                                :

                                                                <span>Submit</span>
                                                            }

                                                        </button>
                                                    </div>


                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                    </>
                )}
                {infoModal && (
                    <>
                        <div className="modal-overlay" onClick={closeModal}></div>
                        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">

                            <section className="vh-100 container_body">
                                <div className="container py-5 h-100">
                                    <div className="row px-3 d-flex align-items-center justify-content-center h-100">
                                        <div className="col-md-10 w-auto col-lg-10 col-xl-9 card flex-row mx-auto px-0">
                                            {/* <div className="img-left d-none d-md-flex">
                                            <div>

                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                                    alt="login form" class="img-fluid" style={{ height: "100%" }} />
                                            </div>
                                        </div> */}

                                            <div className="card-body">
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{ fontSize: "30px" }} onClick={closeModal}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>


                                                <h2 class="title text-center mt-4 modal_heading" >
                                                    Order Details
                                                </h2>
                                                <div style={{ overflowX: 'auto' }}>

                                                    <table className='table'>
                                                        <thead>
                                                            <tr>

                                                                <th scope='col' style={{ opacity: "1", fontWeight: "500", borderBottom: 'none' }}> Name</th>
                                                                <th scope='col' style={{ opacity: "1", fontWeight: "500", borderBottom: 'none' }}> Details</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>


                                                            <tr>
                                                                <td className="f_500">Packgae Name :</td>
                                                                <td>{orderDetails[0]?.package?.package}</td>

                                                            </tr>
                                                            <tr>
                                                                <td className="f_500">Packgae Amount : </td>

                                                                <td>₹{orderDetails[0]?.package?.amount}</td>

                                                            </tr>
                                                            <tr>
                                                                <td className="f_500"> status : </td>


                                                                <td>
                                                                    {orderDetails[0]?.status === "pending" &&
                                                                        <span class="badge badge-info">{orderDetails[0]?.status}</span>

                                                                    }
                                                                    {orderDetails[0]?.status === "complete" &&
                                                                        <span class="badge badge-success">{orderDetails[0]?.status}</span>

                                                                    }
                                                                    {orderDetails[0]?.status === "failed" &&
                                                                        <span class="badge badge-danger">{orderDetails[0]?.status}</span>

                                                                    }

                                                                </td>


                                                            </tr>
                                                            <tr>
                                                                <td className="f_500"> Details : </td>

                                                                <td className="f_500"><pre style={{ width: '100%', whiteSpace: 'pre-wrap', textAlign: 'justify', fontFamily: 'inherit' }}>{orderDetails[0]?.package?.description}</pre>
                                                                </td>

                                                            </tr>

                                                        </tbody>

                                                    </table>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                    </>
                )}


                <section style={{ backgroundColor: "#eee" }}>


                    <div class="container py-5">
                        <div class="d-flex justify-content-end mb-4">
                            <button type="button" class="btn btn-outline-success ms-1" onClick={() => { setActive(active === 1 ? 0 : 1) }}>Order History</button>
                            <button type="button" class="btn btn-outline-danger ms-1" onClick={() => { Logout() }}>Log Out</button>
                        </div>



                        {
                            active === 0
                            &&
                            <>

                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="card mb-4">
                                            <div class="card-body text-center">
                                                <div class="d-flex justify-content-end mb-4">
                                                    <button type="button" class="btn btn-outline-success ms-1 btn-sm" onClick={() => { setProfileModal(!profileModal) }}><i class="bi bi-cloud-arrow-up"></i></button>
                                                </div>

                                                {
                                                    useData?.image ?
                                                        <img src={`${useData?.image}`} alt="avatar"
                                                            class="rounded-circle img-fluid" style={{ width: "150px;" }} />
                                                        :
                                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                                            class="rounded-circle img-fluid" style={{ width: "150px;" }} />


                                                }
                                                <h5 class="my-3">{name ? name : 'user Name'}</h5>
                                                <div class="d-flex justify-content-center mb-2">
                                                    <button type="button" class="btn btn-outline-success ms-1" onClick={() => { setEdit(!edit) }}>Edit Profile</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-lg-8">
                                        <div class="card mb-4">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <p class="mb-0">Full Name</p>
                                                    </div>
                                                    <div class="col-sm-9">
                                                        {
                                                            edit ?
                                                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                                                                :
                                                                <p class="text-muted mb-0">{name ? name : 'No UserName set'}</p>

                                                        }
                                                    </div>
                                                </div>
                                                <hr />
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <p class="mb-0">Email</p>
                                                    </div>
                                                    <div class="col-sm-9">
                                                        {
                                                            edit ?
                                                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                                                                :
                                                                <p class="text-muted mb-0">{email ? email : 'No Email Added'}</p>

                                                        }
                                                    </div>
                                                </div>
                                                <hr />
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <p class="mb-0">Phone</p>
                                                    </div>
                                                    <div class="col-sm-9">
                                                        {
                                                            edit ?
                                                                <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={phone} onChange={(e) => { setPhone(e.target.value) }}></input>
                                                                :
                                                                <p class="text-muted mb-0">{phone ? phone : 'No number Added'}</p>

                                                        }
                                                    </div>
                                                </div>
                                                {
                                                    edit &&
                                                    <>

                                                        <hr />


                                                        <div class="row mt-3">
                                                            <div class="col-sm-3">
                                                            </div>
                                                            <div class="col-sm-9">
                                                                <button type="button" class="btn btn-outline-success ms-1" onClick={() => { Submit() }}>Submit</button>

                                                            </div>
                                                        </div>
                                                    </>

                                                }

                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="card mb-4 mb-md-0">
                                                    <div class="card-body">
                                                        <div style={{ justifyContent: "space-between", display: "flex" }}>
                                                            <p class="mb-4"><span class="text-green  me-1" style={{ fontSize: "25px" }}>Documents</span>
                                                            </p>
                                                            <div class=" ">
                                                                <button type="button" class="btn btn-outline-success ms-1" onClick={() => { openModal() }}>Upload Document</button>
                                                            </div>
                                                        </div>
                                                        <table className='table'>
                                                            <thead>
                                                                <tr>

                                                                    <th scope='col' style={{ opacity: "1", fontWeight: "500", borderBottom: 'none' }}> Name</th>
                                                                    {/* <th scope='col' style={{ opacity: "1", fontWeight: "500", borderBottom: 'none' }}> Image</th> */}
                                                                    <th scope='col' style={{ opacity: "1", fontWeight: "500", borderBottom: 'none' }}>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    document?.length ? document.map((item, index) => {
                                                                        return (
                                                                            <>

                                                                                <tr>

                                                                                    <td>{item.name}</td>
                                                                                    {/* <td>
                                                                            <img src={`${process.env.REACT_APP_BUCKET_URL}/${item.image && item.image}`} style={{ width: "120px" }} className="mb-1" alt="No Previous Image" />


                                                                        </td> */}
                                                                                    <td>


                                                                                        <button type="button" class="btn btn-sm btn-danger" onClick={() => { DeleteDocument(item) }} disabled={disble}>


                                                                                            <span><i class="bi bi-trash"></i></span>
                                                                                        </button>


                                                                                    </td>


                                                                                </tr>
                                                                            </>
                                                                        )
                                                                    })
                                                                        :
                                                                        <>
                                                                            <tr>
                                                                                <td className="text-center" colSpan={2}>No Data</td>
                                                                            </tr>
                                                                        </>
                                                                }

                                                            </tbody>

                                                        </table>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </>

                        }

                        {
                            active === 1
                            &&
                            <>

                                <div class="row">

                                    <div class="col-12">

                                        <div class="row">
                                            <div class="col-12">
                                                <div class="card mb-4 mb-md-0">
                                                    <div class="card-body">
                                                        <div style={{ justifyContent: "space-between", display: "flex" }}>
                                                            <p class="mb-4"><span class=" text-green  me-1" style={{ fontSize: "25px" }}>Orders</span>
                                                            </p>
                                                            <div class=" ">
                                                                {/* <button type="button" class="btn btn-outline-primary ms-1" onClick={() => { openModal() }}>Upload Document</button> */}
                                                            </div>
                                                        </div>
                                                        <div style={{ overflowX: 'auto' }}>

                                                            <table className='table'>
                                                                <thead>
                                                                    <tr>

                                                                        <th scope='col' style={{ opacity: "1", fontWeight: "500", borderBottom: 'none' }}> Package</th>
                                                                        <th scope='col' style={{ opacity: "1", fontWeight: "500", borderBottom: 'none' }}> Amount</th>
                                                                        <th scope='col' style={{ opacity: "1", fontWeight: "500", borderBottom: 'none' }}> status</th>
                                                                        {/* <th scope='col' style={{ opacity: "1", fontWeight: "500", borderBottom: 'none' }}> Image</th> */}
                                                                        <th scope='col' style={{ opacity: "1", fontWeight: "500", borderBottom: 'none' }}>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        orderDetails?.length ? orderDetails.map((item, index) => {
                                                                            return (
                                                                                <>

                                                                                    <tr>

                                                                                        <td>{item.package?.package}</td>
                                                                                        <td>₹{item.package?.amount}</td>

                                                                                        {item.status === "pending" &&
                                                                                            <td><span class="badge badge-info">{item.status}</span>
                                                                                            </td>
                                                                                        }
                                                                                        {item.status === "complete" &&
                                                                                            <td><span class="badge badge-success">{item.status}</span>
                                                                                            </td>
                                                                                        }
                                                                                        {item.status === "failed" &&
                                                                                            <td><span class="badge badge-danger">{item.status}</span>
                                                                                            </td>
                                                                                        }

                                                                                        <td>


                                                                                            <button type="button" class="btn btn-sm btn-primary" onClick={() => { setInfoModal(!infoModal) }}  >


                                                                                                <span><i class="bi bi-info-circle"></i></span>
                                                                                            </button>


                                                                                        </td>


                                                                                    </tr>
                                                                                </>
                                                                            )
                                                                        })
                                                                            :
                                                                            <>
                                                                                <tr>
                                                                                    <td className="text-center" colSpan={4}>No Data</td>
                                                                                </tr>
                                                                            </>



                                                                    }

                                                                </tbody>

                                                            </table>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </>

                        }

                    </div>
                </section>
                <ToastContainer />
                <Footer />
            </div>
        </>
    )
}

export default Profile
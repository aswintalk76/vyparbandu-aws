import { useEffect, useState } from "react";
import Footer from "./Footer";
import uploadFile from "./fileUpload/uploadFile";
import { toast } from "react-toastify";
import deleteFile from "./fileUpload/deleteFile";
import Header from "./Header";
import { Link } from "react-router-dom";


const Blogs = () => {

    const [documentList, setDocumentList] = useState();
    const [modalOpen, setModalOpen] = useState(0)
    const [image, setImage] = useState()
    const [details, setDetails] = useState()
    const [link, setLink] = useState()
    const [description, setDescription] = useState()
    const [name, setName] = useState()
    const [disble, setDisble] = useState(false)
    const [editId, setEditId] = useState()


    const getList = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PORT}/admin/blog/list`);
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

    const callBack = () => {
        setDisble(false)
    }


    const SubmitData = async (event) => {
        event.preventDefault();
        console.log('call')
        if ( name &&  details && description) {
            console.log('call')
            setDisble(true)
            // const fileName = image?.name;

            // await uploadFile(fileName, image, callBack)



            let url = `${process.env.REACT_APP_PORT}/admin/blog/add`;
            const myForm = new FormData();
            myForm.append('file', image)
            myForm.append('heading', name)
            myForm.append('details', details)
            myForm.append('link', link)
            myForm.append('description', description)

            try {
                const response = await fetch(url, {
                    method: "POST",
                    // headers: { "Content-Type": "application/json" },
                    body: myForm
                });
                if (response.status === 200) { 
                    setDisble(false)
                    getList(); setModalOpen(0); setName(); setLink(); setDescription(); setDetails(); setImage();
                    toast.success("Add Data Sucesfully!")
                }
            } catch (e) {
                console.log(e, 'error')
            }
        }
    }
    const UpdateData = async (event) => {
        event.preventDefault();
        if ( name && link && details && description) {
            setDisble(true)
            // let fileName = '';
            // if (image.name && image.type) {
                // const fileName = image.name + Date.now();
                // await uploadFile(fileName, image, callBack)
            // }else{
            //     fileName = image
            // }
            const myForm = new FormData();
            myForm.append('file', image)
            myForm.append('heading', name)
            myForm.append('details', details)
            myForm.append('link', link)
            myForm.append('description', description)
            myForm.append('id', editId)


            let url = `${process.env.REACT_APP_PORT}/admin/blog/edit`;


            try {
                const response = await fetch(url, {
                    method: "POST",
                    // headers: { "Content-Type": "application/json" },
                    body: myForm
                });
                if (response.status === 200) {
                    setDisble(false)
                    setEditId();
                    getList(); setModalOpen(0); setName(); setLink(); setDescription(); setDetails(); setImage();
                    toast.success("Add Data Sucesfully!")
                }
            } catch (e) {
                console.log(e, 'error')
            }
        }
    }
     
    const DeleteData = async (dataId) => {

        setDisble(true)
        await deleteFile(dataId.fileName, callBack);
        let url = `${process.env.REACT_APP_PORT}/admin/blog/delete`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dataId: dataId })
            });
            if (response.status === 200) {
                setDisble(false)

                getList();
                setModalOpen(0)
                toast.success("Data deleted Sucesfully!")
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
                    <h1>Blogs</h1>

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
                            <li className='breadcrumb-item active'>Blogs</li>
                        </ol>
                    </nav>
                </div>
                <section className='section'>
                    <div className='row'>

                        <div className='card'>
                            <div className='card-body'>
                                <div style={{ display: 'flex', justifyContent: 'end' }}>

                                    <h5 className='card-title'>
                                        {
                                            disble ?
                                                <button type="button" class="btn btn-outline-primary" disabled>
                                                    <div class="spinner-border text-primary" role="status">
                                                        <span class="sr-only"></span>
                                                    </div>
                                                </button>

                                                :

                                                <button type="button" class="btn btn-outline-primary" onClick={() => { setModalOpen(modalOpen !== 1 ? 1 : 0) }}>
                                                    Add Document</button>
                                        }


                                    </h5>
                                </div>
                                {
                                    modalOpen === 0 &&

                                    <table className='table'>
                                        <thead>
                                            <tr>

                                                <th scope='col'>Heading</th>
                                                <th scope='col'>Details</th>
                                                <th scope='col'>Link</th>
                                                <th scope='col'>Details</th>
                                                <th scope='col'>Image</th>
                                                <th scope='col'>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                documentList && documentList.map((item, index) => {
                                                    return (
                                                        <>

                                                            <tr>

                                                                <td>{item.heading}</td>
                                                                <td><textarea className='form-control' style={{ maxHeight: "110px", fontSize: "10px" }} >{item.details}</textarea></td>
                                                                <td>{item.link}</td>
                                                                <td><textarea className='form-control' style={{ maxHeight: "110px", fontSize: "10px" }} >{item.description}</textarea></td>
                                                                <td>
                                                                    <img src={`${item.image && item.image}`} style={{ width: "250px" }} className="mb-1" alt="No Previous Image" />

                                                                </td>

                                                                <td>
                                                                    {
                                                                        disble ?
                                                                            <>

                                                                                <button type="button" className="btn btn-sm btn-primary" style={{ marginRight: "3px" }} onClick={() => {

                                                                                }}><i class="bi bi-pencil"></i></button>
                                                                                <button type="button" class="btn btn-sm btn-danger" disabled><i class="bi bi-trash"></i></button>
                                                                            </>
                                                                            :
                                                                            <>

                                                                                <button type="button" className="btn btn-sm btn-primary" style={{ marginRight: "3px" }} onClick={() => {
                                                                                    setName(item.heading)
                                                                                    setDetails(item.details)
                                                                                    setLink(item.link)
                                                                                    setDescription(item.description)
                                                                                    setImage(item.image)
                                                                                    setEditId(item._id)

                                                                                    setModalOpen(2)

                                                                                }}><i class="bi bi-pencil"></i></button>
                                                                                <button type="button" class="btn btn-sm btn-danger" onClick={() => { DeleteData(item._id) }}><i class="bi bi-trash"></i></button>
                                                                            </>
                                                                    }
                                                                </td>



                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }

                                        </tbody>

                                    </table>
                                }
                                {
                                    modalOpen === 1 &&
                                    <form encType='multipart/form-data'>
                                        <div className='row mb-3'>
                                            <label for='inputText' className='col-sm-2 col-form-label'>Blog Heading<span style={{ color: "red" }}>*</span></label>
                                            <div className='col-sm-10'>
                                                <input type='text' placeholder='Document Name' className='form-control' value={name} onChange={(e) => { setName(e.target.value) }} />
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <label for='inputText' className='col-sm-2 col-form-label'>Blog Details<span style={{ color: "red" }}>*</span></label>
                                            <div className='col-sm-10'>
                                                <textarea type='text' placeholder='Document Name' className='form-control' value={details} onChange={(e) => { setDetails(e.target.value) }} style={{ height: "110px", fontSize: "10px" }} />
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <label for='inputText' className='col-sm-2 col-form-label'>Video link<span style={{ color: "red" }}>*</span></label>
                                            <div className='col-sm-10'>
                                                <input type='text' placeholder='Document Name' className='form-control' value={link} onChange={(e) => { setLink(e.target.value) }} />
                                            </div>
                                        </div>

                                        <div className='row mb-3'>
                                            <label for='inputText' className='col-sm-2 col-form-label'>Blog Details<span style={{ color: "red" }}>*</span></label>
                                            <div className='col-sm-10'>
                                                <textarea type='text' placeholder='Document Name' className='form-control' value={description} onChange={(e) => { setDescription(e.target.value) }} style={{ height: "110px", fontSize: "10px" }} />
                                            </div>
                                        </div>



                                        <div className='row mb-3'>
                                            <label for='inputNumber' className='col-sm-2 col-form-label'>Image Upload <span style={{ color: "red" }}>*</span></label>
                                            <div className='col-sm-10'>
                                                <input type='file' className='formFile' onChange={(e) => { setImage(e.target.files[0]) }} />
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <label className='col-sm-2 col-form-label'></label>
                                            <div className='col-sm-10'>

                                                <button type='submit' className='btn btn-primary' onClick={(e) => { SubmitData(e) }}>Submit</button>
                                            </div>
                                        </div>


                                    </form>
                                }
                                {
                                    modalOpen === 2 &&
                                    <form encType='multipart/form-data'>
                                        <div className='row mb-3'>
                                            <label for='inputText' className='col-sm-2 col-form-label'>Blog Heading<span style={{ color: "red" }}>*</span></label>
                                            <div className='col-sm-10'>
                                                <input type='text' placeholder='Document Name' className='form-control' value={name} onChange={(e) => { setName(e.target.value) }} />
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <label for='inputText' className='col-sm-2 col-form-label'>Blog Details<span style={{ color: "red" }}>*</span></label>
                                            <div className='col-sm-10'>
                                                <textarea type='text' placeholder='Document Name' className='form-control' value={details} onChange={(e) => { setDetails(e.target.value) }} style={{ height: "110px", fontSize: "10px" }} />
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <label for='inputText' className='col-sm-2 col-form-label'>Video link<span style={{ color: "red" }}>*</span></label>
                                            <div className='col-sm-10'>
                                                <input type='text' placeholder='Document Name' className='form-control' value={link} onChange={(e) => { setLink(e.target.value) }} />
                                            </div>
                                        </div>

                                        <div className='row mb-3'>
                                            <label for='inputText' className='col-sm-2 col-form-label'>Blog Details<span style={{ color: "red" }}>*</span></label>
                                            <div className='col-sm-10'>
                                                <textarea type='text' placeholder='Document Name' className='form-control' value={description} onChange={(e) => { setDescription(e.target.value) }} style={{ height: "110px", fontSize: "10px" }} />
                                            </div>
                                        </div>



                                        <div className='row mb-3'>
                                            <label for='inputNumber' className='col-sm-2 col-form-label'>Image Upload <span style={{ color: "red" }}>*</span></label>
                                            <div className='col-sm-10'>
                                                <input type='file' className='formFile' onChange={(e) => { setImage(e.target.files[0]) }} />
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <label className='col-sm-2 col-form-label'></label>
                                            <div className='col-sm-10'>
                                                <button type='submit' className='btn btn-primary' onClick={(e) => { UpdateData(e) }}>Submit</button>
                                            </div>
                                        </div>


                                    </form>
                                }


                            </div>
                        </div>

                    </div>
                </section>

            </main>
            <Footer />


        </>
    )
}

export default Blogs
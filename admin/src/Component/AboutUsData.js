import { Link } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const AboutUsData = () => {
    const [documentList, setDocumentList] = useState();
    const [otherDataList, setOtherDataList] = useState();


    const getList = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PORT}/admin/about/getData`);
            const data = await response.json();
            if (response.status === 200) {

                setDocumentList(data && data)
                setOtherDataList(data?.map(item => item.otherdata));
            }
            console.log('Data received:', data);

        } catch (e) {
            console.log(e, 'error')
        }

    }
    useEffect(() => {

        getList();

    }, [])


    const SaveData = (updatedItem) => {
        console.log(updatedItem)
        setDocumentList(documentList.map(item => {
            if (item._id === updatedItem._id) {
                return updatedItem;
            }
            return item;
        }
        ))
    }
    const SaveOtherData = async (item) => {
        let url = `${process.env.REACT_APP_PORT}/admin/about/editOtherData`
        console.log(item)
        const myForm = new FormData();
        myForm.append('file', item.otherdata.image)
        myForm.append('heading', item.otherdata.heading)
        myForm.append('dataId', item._id)
        myForm.append('details', item.otherdata.details)

        try {
            const response = await fetch(url, {
                method: "POST",
                // headers: { "Content-Type": "application/json" },
                body: myForm
            });
            if (response.status === 200) {
                toast.success("Save Data Sucesfully!")
                getList()
            }
        } catch (e) {
            console.log(e, 'error')
        }
    }

    const SaveMainData = async (item) => {
        let url = `${process.env.REACT_APP_PORT}/admin/about/updateMainData`



        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ heading: item.heading, subheading: item.subheading, dataId: item._id, description: item.description })
            });
            if (response.status === 200) {
                toast.success("Save Data Sucesfully!")
                getList()
            }
        } catch (e) {
            console.log(e, 'error')
        }

    }
    const AddData = async (dataId) => {
        let url = `${process.env.REACT_APP_PORT}/admin/about/AddotherData`



        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dataId })
            });
            if (response.status === 200) {
                toast.success("Add Data Sucesfully!")
                getList()
            }
        } catch (e) {
            console.log(e, 'error')
        }

    }
    const SetTableData = async (dataId, item) => {
        let url = `${process.env.REACT_APP_PORT}/admin/about/edittableData`
        console.log(dataId, item)
        const myForm = new FormData();
        myForm.append('file', item.image)
        myForm.append('heading', item.heading)
        myForm.append('description', item.description)
        myForm.append('dataId', dataId)
        myForm.append('dataObjectId', item._id)


        try {
            const response = await fetch(url, {
                method: "POST",
                // headers: { "Content-Type": "application/json" },
                body: myForm
            });
            if (response.status === 200) {
                toast.success("Add Data Sucesfully!")
                getList()
            }
        } catch (e) {
            console.log(e, 'error')
        }

    }


    const SaveTableData = (sectionId, updatedQuestion) => {

        const updatedData = documentList.map(item => {
            if (item._id === sectionId) {
                const updatedQuestions = item?.otherdata?.data.map((item) => {
                    if (item._id === updatedQuestion._id) {
                        return updatedQuestion
                    }
                    return item
                })
                return { ...item, otherdata: { ...item.otherdata, data: updatedQuestions } };
            }
            return item;
        });
        setDocumentList(updatedData);
    };

    return (
        <>
            <Header />
            <main id='main' className='main'>
                <div className='pagetitle'>
                    <h1>AboutUs Data</h1>

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
                            <li className='breadcrumb-item active'>HomePage Data</li>
                        </ol>
                    </nav>
                </div>

                {
                    documentList?.map((main, index) => {
                        return (
                            <>




                                <section className='section'>
                                    <div className='row'>

                                        <div className='card'>
                                            <div className='card-body mt-3'>
                                                <div className='row mb-3 mt-2'>
                                                    <label htmlFor='inputText' className='col-sm-2 col-form-label'> Heading <span style={{ color: "red" }}>*</span></label>
                                                    <div className='col-sm-10'>
                                                        <input type='text' placeholder='Enter Heading' className='form-control' value={main?.heading}
                                                            onChange={(e) => {
                                                                const updatedItem = { ...main, heading: e.target.value };
                                                                SaveData(updatedItem);
                                                            }} />
                                                    </div>
                                                </div>
                                                <div className='row mb-3 mt-2'>
                                                    <label htmlFor='inputText' className='col-sm-2 col-form-label'>Sub Heading <span style={{ color: "red" }}>*</span></label>
                                                    <div className='col-sm-10'>
                                                        <input type='text' placeholder='Enter SubHeading' className='form-control' value={main?.subheading}
                                                            onChange={(e) => {
                                                                const updatedItem = { ...main, subheading: e.target.value };
                                                                SaveData(updatedItem);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row mb-3 mt-2'>
                                                    <label htmlFor='inputText' className='col-sm-2 col-form-label'> Description <span style={{ color: "red" }}>*</span></label>
                                                    <div className='col-sm-10'>
                                                        <textarea placeholder='Description' className='form-control w-100 textarea_design' style={{ minHeight: "90px" }} value={main?.description}
                                                            onChange={(e) => {
                                                                const updatedItem = { ...main, description: e.target.value };
                                                                SaveData(updatedItem);
                                                            }}
                                                        />

                                                    </div>
                                                </div>
                                                <div className='row mb-3'>
                                                    <label className='col-sm-2 col-form-label'></label>
                                                    <div className='col-sm-10'>
                                                        <button type='submit' className='btn btn-primary' onClick={() => { SaveMainData(main) }} >Save</button>
                                                    </div>
                                                </div>











                                            </div>
                                        </div>

                                    </div>
                                </section>

                                <section className='section'>
                                    <div className='row'>

                                        <div className='card'>
                                            <div className='card-body mt-3'>
                                                <div className='row mb-3 mt-2'>
                                                    <label htmlFor='inputText' className='col-sm-2 col-form-label'> Heading <span style={{ color: "red" }}>*</span></label>
                                                    <div className='col-sm-10'>
                                                        <input type='text' placeholder='Enter Heading' className='form-control' value={main?.otherdata?.heading}
                                                            onChange={(e) => {
                                                                const updateData = { ...main, otherdata: { ...main.otherdata, heading: e.target.value } };
                                                                SaveData(updateData);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row mb-3 mt-2'>
                                                    <label htmlFor='inputText' className='col-sm-2 col-form-label'>Image <span style={{ color: "red" }}>*</span></label>
                                                    <div className='col-sm-10'>
                                                        <img src={`${main?.otherdata?.image}`} style={{ width: "120px" }} className="mb-1" alt="No Previous Image" />

                                                        <input type='file' placeholder='Icon' className='form-control'
                                                            onChange={(e) => {
                                                                const updateData = { ...main, otherdata: { ...main.otherdata, image: e.target.files[0] } };
                                                                SaveData(updateData);
                                                            }}
                                                        />

                                                    </div>
                                                </div>
                                                <div className='row mb-3 mt-2'>
                                                    <label htmlFor='inputText' className='col-sm-2 col-form-label'> Description <span style={{ color: "red" }}>*</span></label>
                                                    <div className='col-sm-10'>
                                                        <textarea placeholder='Description' type='text' className='form-control w-100 textarea_design' style={{ minHeight: "90px" }} value={main?.otherdata?.details}
                                                            onChange={(e) => {
                                                                const updateData = { ...main, otherdata: { ...main.otherdata, details: e.target.value } };
                                                                SaveData(updateData);
                                                            }}
                                                        />

                                                    </div>
                                                </div>
                                                <div className='row mb-3'>
                                                    <label className='col-sm-2 col-form-label'></label>
                                                    <div className='col-sm-10'>
                                                        <button type='submit' className='btn btn-primary' onClick={() => { SaveOtherData(main) }} >Save</button>
                                                    </div>
                                                </div>
                                                <div className="d-flex mt-5" style={{ justifyContent: "space-between" }}>
                                                    <h4></h4>
                                                    <button type="button" className="btn btn-outline-primary" onClick={() => { AddData(main._id) }} ><i className="bi bi-file-plus"></i></button>
                                                </div>
                                                <table className='table'>
                                                    <thead>
                                                        <tr>

                                                            <th scope='col'> Heading</th>
                                                            <th scope='col'> Image</th>
                                                            <th scope='col'> Details</th>
                                                            <th scope='col'>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            main?.otherdata?.data.map((item) => {

                                                                return (
                                                                    <>
                                                                        <tr>
                                                                            <td>

                                                                                <input type='text' placeholder='Name' className='form-control' value={item.heading}
                                                                                    onChange={(e) => {
                                                                                        const updatedQuestion = { ...item, heading: e.target.value };
                                                                                        SaveTableData(main._id, updatedQuestion);
                                                                                    }} />
                                                                            </td>
                                                                            <td>
                                                                                <img src={`${item.image && item.image}`} style={{ width: "120px" }} className="mb-1" alt="No Previous Image" />

                                                                                <input type='file' placeholder='Icon' className='form-control' onChange={(e) => {
                                                                                    const updatedQuestion = { ...item, image: e.target.files[0] };
                                                                                    SaveTableData(main._id, updatedQuestion);

                                                                                }} />
                                                                            </td>
                                                                            <td>
                                                                                <textarea placeholder='Description' className='form-control w-100 textarea_design' style={{ minHeight: "90px" }} value={item.description}
                                                                                    onChange={(e) => {
                                                                                        const updatedQuestion = { ...item, description: e.target.value };
                                                                                        SaveTableData(main._id, updatedQuestion);

                                                                                    }}
                                                                                />

                                                                            </td>
                                                                            <td>

                                                                                <button type="button" className="btn btn-sm btn-primary" style={{ marginRight: "3px" }} onClick={() => { SetTableData(main._id, item) }}>Save</button>

                                                                                <button type="button" className="btn btn-sm btn-danger"  ><i className="bi bi-trash"></i></button>

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



                            </>
                        )
                    })
                }

            </main>
            <Footer />
        </>
    )
}

export default AboutUsData
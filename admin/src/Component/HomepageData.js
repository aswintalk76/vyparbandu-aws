import { Link } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const HomepageData = () => {
    const [documentList, setDocumentList] = useState();


    const getList = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PORT}/admin/home/getData`);
            const data = await response.json();
            if (response.status === 200) {

                setDocumentList(data && data)
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
        let url = `${process.env.REACT_APP_PORT}/admin/expertCalldelete`
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



    const ImageAttribute = async (innerId) => {
        let url = `${process.env.REACT_APP_PORT}/admin/home/addImage`

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ innerId: innerId })
            });
            if (response.status === 200) {
                toast.success("Add Attribute Sucesfully!")

                getList()
            }
        } catch (e) {
            toast.error(e)

            console.log(e, 'error')
        }
    }
    const AddAttribute = async (innerId) => {
        let url = `${process.env.REACT_APP_PORT}/admin/home/addAttribute`

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ innerId: innerId })
            });
            if (response.status === 200) {
                toast.success("Add Attribute Sucesfully!")

                getList()
            }
        } catch (e) {
            toast.error(e)

            console.log(e, 'error')
        }
    }
    const DeleteImageAttribute = async (docId, objectId) => {
        let url = `${process.env.REACT_APP_PORT}/admin/home/deleteImage`

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ docId, objectId })
            });;
            if (response.status === 200) {
                toast.success("Add Attribute Sucesfully!")

                getList()
            }
        } catch (e) {
            toast.error(e)

            console.log(e, 'error')
        }
    }

    const SaveImage = async (dataId, Imageid, file) => {
        let url = `${process.env.REACT_APP_PORT}/admin/home/saveImage`
        console.log(dataId, Imageid, file)

        const myForm = new FormData();
        myForm.append('file', file)
        myForm.append('dataId', dataId)
        myForm.append('Imageid', Imageid)
        try {
            const response = await fetch(url, {
                method: "POST",
                // headers: { "Content-Type": "application/json" },
                body: myForm
            });
            if (response.status === 200) {


                getList();
                toast.success("data Save Sucesfully!")
            }
        } catch (e) {
            toast.error(e)

            console.log(e, 'error')
        }
    }


    const SaveData = (updatedItem) => {
        setDocumentList(documentList.map(item => {
            if (item._id === updatedItem._id) {
                return updatedItem;
            }
            return item;
        }
        ))
    }


    const Saveinner = (sectionId, questionId, updatedQuestion) => {
        const updateList = documentList.map(item => {
            if (item._id === sectionId) {
                const updatedQuestions = item.services?.data?.map(questionData => {
                    if (questionData._id === questionId) {
                        return updatedQuestion;
                    }
                    return questionData;
                });
                return { ...item, services: { ...item.services, data: updatedQuestions } };
            }
            return item;
        });
        setDocumentList(updateList)
    }

    const Saveworkflow = (sectionId, questionId, updatedQuestion) => {
        const updateList = documentList.map(item => {
            if (item._id === sectionId) {
                const updatedQuestions = item.workFlow?.data?.map(questionData => {
                    if (questionData._id === questionId) {
                        return updatedQuestion;
                    }
                    return questionData;
                });
                return { ...item, workFlow: { ...item.workFlow, data: updatedQuestions } };
            }
            return item;
        });
        setDocumentList(updateList)
    }
    const SaveAbout = (sectionId, questionId, updatedQuestion) => {
        const updateList = documentList.map(item => {
            if (item._id === sectionId) {
                const updatedQuestions = item.about?.data?.map(questionData => {
                    if (questionData._id === questionId) {
                        return updatedQuestion;
                    }
                    return questionData;
                });
                return { ...item, about: { ...item.about, data: updatedQuestions } };
            }
            return item;
        });
        setDocumentList(updateList)
    }
    const SaveWhyVypar = (sectionId, questionId, updatedQuestion) => {
        const updateList = documentList.map(item => {
            if (item._id === sectionId) {
                const updatedQuestions = item.whyvyparbandhu?.data?.map(questionData => {
                    if (questionData._id === questionId) {
                        return updatedQuestion;
                    }
                    return questionData;
                });
                return { ...item, whyvyparbandhu: { ...item.whyvyparbandhu, data: updatedQuestions } };
            }
            return item;
        });
        setDocumentList(updateList)
    }



    const MostHeadingsave = async (dataid, heading) => {

        let url = `${process.env.REACT_APP_PORT}/admin/home/mostHeadingsave`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dataid: dataid, heading: heading })
            });
            if (response.status === 200) {
                toast.success("Save Data Sucesfully!")
                getList()

            }
        } catch (e) {
            console.log(e, 'error')
        }
    }
    const OverWorkFlow = async (dataid, heading) => {

        let url = `${process.env.REACT_APP_PORT}/admin/home/overworkHeadingsave`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dataid: dataid, heading: heading })
            });
            if (response.status === 200) {
                toast.success("Save Data Sucesfully!")
                getList()

            }
        } catch (e) {
            console.log(e, 'error')
        }
    }
    const AboutHeadingSave = async (dataid, heading, description) => {

        let url = `${process.env.REACT_APP_PORT}/admin/home/abutHeadingsave`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dataid: dataid, heading: heading, description: description })
            });
            if (response.status === 200) {
                toast.success("Save Data Sucesfully!")
                getList()

            }
        } catch (e) {
            console.log(e, 'error')
        }
    }
    const WhyHeadingSave = async (dataid, heading) => {

        let url = `${process.env.REACT_APP_PORT}/admin/home/whyHeadingsave`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dataid: dataid, heading: heading })
            });
            if (response.status === 200) {
                toast.success("Save Data Sucesfully!")
                getList()

            }
        } catch (e) {
            console.log(e, 'error')
        }
    }
    const ServiceDatasave = async (mainID, item) => {

        console.log(item, mainID)
        let url = `${process.env.REACT_APP_PORT}/admin/home/saveServices`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mainID: mainID, dataId: item._id, name: item.name, details: item.details })
            });
            if (response.status === 200) {
                toast.success("Save Data Sucesfully!")
                getList()

            }
        } catch (e) {
            console.log(e, 'error')
        }
    }
    const OurDatasave = async (mainID, item) => {

        let url = `${process.env.REACT_APP_PORT}/admin/home/saveOur`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mainID: mainID, dataId: item._id, name: item.name })
            });
            if (response.status === 200) {
                toast.success("Save Data Sucesfully!")
                getList()

            }
        } catch (e) {
            console.log(e, 'error')
        }
    }
    const AboutDatasave = async (mainID, item) => {

        let url = `${process.env.REACT_APP_PORT}/admin/home/saveAbout`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mainID: mainID, dataId: item._id, name: item.name })
            });
            if (response.status === 200) {
                toast.success("Save Data Sucesfully!")
                getList()

            }
        } catch (e) {
            console.log(e, 'error')
        }
    }
    const WhyVyparDatasave = async (mainID, item) => {

        let url = `${process.env.REACT_APP_PORT}/admin/home/saveWhyVypar`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mainID: mainID, dataId: item._id, name: item.name })
            });
            if (response.status === 200) {
                toast.success("Save Data Sucesfully!")
                getList()

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
                    <h1>HomePage Data</h1>

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
                                            <div className='card-body'>
                                                <div className="d-flex mt-3" style={{ justifyContent: "space-between" }}>
                                                    <h4>Slider Images</h4>
                                                    <button type="button" className="btn btn-outline-primary" onClick={() => { ImageAttribute(main._id) }} ><i className="bi bi-file-plus"></i></button>
                                                </div>



                                                <table className='table'>
                                                    <thead>
                                                        <tr>

                                                            <th scope='col'> Images</th>
                                                            <th scope='col'>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>




                                                        {
                                                            main?.sliderImage.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <tr key={index}>
                                                                            <td>
                                                                                <div className="col-12 ">
                                                                                    <img src={`${item.image && item.image}`} style={{ width: "200px" }} className="mb-1" alt="No Previous Image" />

                                                                                    <input type='file' placeholder='Icon' className='form-control' onChange={(e) => {

                                                                                        SaveImage(main._id, item._id, e.target.files[0])


                                                                                    }} />
                                                                                </div>
                                                                            </td>
                                                                            <td className="col-1">
                                                                                <div className="d-flex mt-1">
                                                                                    <button type="button" className="btn btn-sm btn-danger" onClick={() => { DeleteImageAttribute(main._id, item._id) }}><i className="bi bi-trash"></i></button>
                                                                                </div>
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


                                <section className='section'>
                                    <div className='row'>

                                        <div className='card'>
                                            <div className='card-body mt-3'>
                                                <div className='row mb-3 mt-2'>
                                                    <label htmlFor='inputText' className='col-sm-2 col-form-label'> Heading <span style={{ color: "red" }}>*</span></label>
                                                    <div className='col-sm-10'>
                                                        <input type='text' placeholder='Enter Heading' className='form-control' value={main.services.heading} onChange={(e) => {
                                                            const updatedItem = { ...main, services: { ...main.services, heading: e.target.value } };
                                                            SaveData(updatedItem);

                                                        }} />
                                                    </div>
                                                </div>
                                                <div className='row mb-3'>
                                                    <label className='col-sm-2 col-form-label'></label>
                                                    <div className='col-sm-10'>
                                                        <button type='submit' className='btn btn-primary' onClick={() => { MostHeadingsave(main._id, main.services.heading) }}>Save</button>
                                                    </div>
                                                </div>



                                                <table className='table'>
                                                    <thead>
                                                        <tr>

                                                            <th scope='col'> name</th>
                                                            <th scope='col'> Details</th>
                                                            <th scope='col'>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>




                                                        {
                                                            main?.services?.data.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <tr key={index}>
                                                                            <td className="col-3">
                                                                                <div className="">
                                                                                    <div className="col-10">
                                                                                        <input type='text' placeholder='Name' className='form-control' value={item.name} onChange={(e) => {

                                                                                            const updatedQuestion = { ...item, name: e.target.value };
                                                                                            Saveinner(main._id, item._id, updatedQuestion);
                                                                                        }}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="col-4">
                                                                                <div className="col-12">
                                                                                    <textarea placeholder='Description' className='form-control w-100 textarea_design' style={{ minHeight: "90px" }} value={item.details} onChange={(e) => {

                                                                                        const updatedQuestion = { ...item, details: e.target.value };
                                                                                        Saveinner(main._id, item._id, updatedQuestion);
                                                                                    }} />
                                                                                </div>
                                                                            </td>
                                                                            <td className="col-1">
                                                                                <div className="d-flex mt-1" style={{ gap: "5px" }}>
                                                                                    <button type="button" className="btn btn-sm btn-primary" onClick={() => { ServiceDatasave(main._id, item) }} >Save</button>

                                                                                    {/* <button type="button" className="btn btn-sm btn-danger" ><i className="bi bi-trash"></i></button> */}
                                                                                </div>
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


                                <section className='section'>
                                    <div className='row'>
                                        <div className='card'>
                                            <div className='card-body mt-3'>
                                                <div className='row mb-3 mt-2'>
                                                    <label htmlFor='inputText' className='col-sm-2 col-form-label'> Heading <span style={{ color: "red" }}>*</span></label>
                                                    <div className='col-sm-10'>
                                                        <input type='text' placeholder='Enter Heading' className='form-control' value={main?.workFlow?.heading} onChange={(e) => {

                                                            const updatedItem = { ...main, workFlow: { ...main.workFlow, heading: e.target.value } };
                                                            SaveData(updatedItem);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className='row mb-3'>
                                                    <label className='col-sm-2 col-form-label'></label>
                                                    <div className='col-sm-10'>
                                                        <button type='submit' className='btn btn-primary' onClick={() => { OverWorkFlow(main._id, main.workFlow.heading) }}>Save</button>
                                                    </div>
                                                </div>
                                                <table className='table'>
                                                    <thead>
                                                        <tr>
                                                            <th scope='col'> name</th>
                                                            <th scope='col'>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            main?.workFlow?.data.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <tr key={index}>
                                                                            <td className="col-3">
                                                                                <div className="">
                                                                                    <div className="col-10">
                                                                                        <input type='text' placeholder='Name' className='form-control' value={item.name} onChange={(e) => {
                                                                                            const updatedQuestion = { ...item, name: e.target.value };
                                                                                            Saveworkflow(main._id, item._id, updatedQuestion);
                                                                                        }} />
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="col-1">
                                                                                <div className="d-flex mt-1" style={{ gap: "5px" }}>
                                                                                    <button type="button" className="btn btn-sm btn-primary" onClick={() => { OurDatasave(main._id, item) }}>Save</button>

                                                                                    {/* <button type="button" className="btn btn-sm btn-danger" ><i className="bi bi-trash"></i></button> */}
                                                                                </div>
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



                                <section className='section'>
                                    <div className='row'>
                                        <div className='card'>
                                            <div className='card-body mt-3'>
                                                <div className='row mb-3 mt-2'>
                                                    <label htmlFor='inputText' className='col-sm-2 col-form-label'> Heading <span style={{ color: "red" }}>*</span></label>
                                                    <div className='col-sm-10'>
                                                        <input type='text' placeholder='Enter Heading' className='form-control' value={main?.about?.heading} onChange={(e) => {

                                                            const updatedItem = { ...main, about: { ...main.about, heading: e.target.value } };
                                                            SaveData(updatedItem);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className='row mb-3 mt-2'>
                                                    <label htmlFor='inputText' className='col-sm-2 col-form-label'> Description <span style={{ color: "red" }}>*</span></label>
                                                    <div className='col-sm-10'>
                                                        <textarea placeholder='Description' className='form-control w-100 textarea_design' value={main?.about?.description} onChange={(e) => {

                                                            const updatedItem = { ...main, about: { ...main.about, description: e.target.value } };
                                                            SaveData(updatedItem);
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className='row mb-3'>
                                                    <label className='col-sm-2 col-form-label'></label>
                                                    <div className='col-sm-10'>
                                                        <button type='submit' className='btn btn-primary' onClick={() => { AboutHeadingSave(main._id, main.about.heading, main.about.description) }}>Save</button>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex' }}>
                                                    <h5 className='card-title' style={{ fontWeight: "600" }}>Add Attributes
                                                        <button type="button" className="btn btn-outline-primary" style={{ marginLeft: "5px" }} onClick={()=>{AddAttribute(main._id)}}>
                                                            <i className="bi bi-file-plus"></i>
                                                        </button>
                                                    </h5>

                                                </div>
                                                <table className='table'>
                                                    <thead>
                                                        <tr>
                                                            <th scope='col'> Name</th>
                                                            <th scope='col'>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            main?.about?.data.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <tr key={index}>
                                                                            <td className="col-3">
                                                                                <div className="">
                                                                                    <div className="col-10">
                                                                                        <input type='text' placeholder='Name' className='form-control' value={item.name} onChange={(e) => {
                                                                                            const updatedQuestion = { ...item, name: e.target.value };
                                                                                            SaveAbout(main._id, item._id, updatedQuestion);
                                                                                        }} />
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="col-1">
                                                                                <div className="d-flex mt-1" style={{ gap: "5px" }}>
                                                                                    <button type="button" className="btn btn-sm btn-primary" onClick={()=>{AboutDatasave(main._id , item)}} >Save</button>

                                                                                    <button type="button" className="btn btn-sm btn-danger" ><i className="bi bi-trash"></i></button>
                                                                                </div>
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


                                <section className='section'>
                                    <div className='row'>
                                        <div className='card'>
                                            <div className='card-body mt-3'>
                                                <div className='row mb-3 mt-2'>
                                                    <label htmlFor='inputText' className='col-sm-2 col-form-label'> Heading <span style={{ color: "red" }}>*</span></label>
                                                    <div className='col-sm-10'>
                                                        <input type='text' placeholder='Enter Heading' className='form-control' value={main?.whyvyparbandhu?.heading} onChange={(e) => {

                                                            const updatedItem = { ...main, whyvyparbandhu: { ...main.whyvyparbandhu, heading: e.target.value } };
                                                            SaveData(updatedItem);
                                                        }} />
                                                    </div>
                                                </div>

                                                <div className='row mb-3'>
                                                    <label className='col-sm-2 col-form-label'></label>
                                                    <div className='col-sm-10'>
                                                        <button type='submit' className='btn btn-primary' onClick={() => { WhyHeadingSave(main._id, main.whyvyparbandhu.heading) }}>Save</button>
                                                    </div>
                                                </div>

                                                <table className='table'>
                                                    <thead>
                                                        <tr>
                                                            <th scope='col'> Name</th>
                                                            <th scope='col'>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            main?.whyvyparbandhu?.data.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <tr key={index}>
                                                                            <td className="col-3">
                                                                                <div className="">
                                                                                    <div className="col-10">
                                                                                        <input type='text' placeholder='Name' className='form-control' value={item.name} onChange={(e) => {
                                                                                            const updatedQuestion = { ...item, name: e.target.value };
                                                                                            SaveWhyVypar(main._id, item._id, updatedQuestion);
                                                                                        }} />
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="col-1">
                                                                                <div className="d-flex mt-1" style={{ gap: "5px" }}>
                                                                                    <button type="button" className="btn btn-sm btn-primary" onClick={()=>{WhyVyparDatasave(main._id , item)}}>Save</button>

                                                                                    {/* <button type="button" className="btn btn-sm btn-danger" ><i className="bi bi-trash"></i></button> */}
                                                                                </div>
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

export default HomepageData
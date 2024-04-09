import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import uploadFile from "../fileUpload/uploadFile";
import deleteFile from "../fileUpload/deleteFile";
const Step3 = ({ setActiveTab, selectServicedata, getById }) => {
    const [data, setData] = useState();
    const [disble, setDisble] = useState(false)

    const callBack = () => {
        setDisble(false)
    }

    useEffect(() => {
        setData(selectServicedata.stepThreeData)
    }, [selectServicedata.stepThreeData])







    const handleNext = () => {
        setActiveTab('9');
    };


    const AddSection = async (type) => {
        let url = `${process.env.REACT_APP_PORT}/admin/service/updateStep3`

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: type, mainCategoryid: selectServicedata._id, innerId: "" })
            });
            if (response.status === 200) {
                toast.success("Add Section Sucesfully!")

                getById(selectServicedata._id)
            }
        } catch (e) {
            console.log(e, 'error')
        }

    }

    const AddAttribute = async (type, innerId) => {
        let url = `${process.env.REACT_APP_PORT}/admin/service/updateStep3`

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: type, mainCategoryid: selectServicedata._id, innerId: innerId })
            });
            if (response.status === 200) {
                toast.success("Add Attribute Sucesfully!")

                getById(selectServicedata._id)
            }
        } catch (e) {
            console.log(e, 'error')
        }

    }

    const DeleteSection = async (type, sectionData) => {
        let url = `${process.env.REACT_APP_PORT}/admin/service/deletestep3`
        setDisble(true)
        if (sectionData.image) {
            await deleteFile(sectionData.image, callBack);
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: type, innerCategoryid: sectionData._id, mainCategoryid: selectServicedata._id, innerId: '' })
            });
            if (response.status === 200) {
                toast.success("Delete Section Sucesfully!")

                getById(selectServicedata._id)
            }
        } catch (e) {
            console.log(e, 'error')
        }

    };

    const DeleteAttribute = async (type, id, innerId) => {
        let url = `${process.env.REACT_APP_PORT}/admin/service/deletestep3`

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: type, innerCategoryid: id, mainCategoryid: selectServicedata._id, innerId: innerId })
            });
            if (response.status === 200) {
                toast.success("Delete Attribute Sucesfully!")

                getById(selectServicedata._id)
            }
        } catch (e) {
            console.log(e, 'error')
        }

    };


    const SaveAttribute = async (item) => {

        let url = `${process.env.REACT_APP_PORT}/admin/service/updateStep3Heading`
        setDisble(true)

        // const fileName = item?.image ? item.image.name + Date.now() : null
        // if (item.image) {
        //     await uploadFile(fileName, item.image, callBack)
        // }
        const myForm = new FormData();
        myForm.append('file', item.image)
        myForm.append('mainCategoryid', selectServicedata._id)
        myForm.append('innerId', item._id)
        myForm.append('heading', item.heading)
        try {
            const response = await fetch(url, {
                method: "POST",
                // headers: { "Content-Type": "application/json" },
                body: myForm
            });
            if (response.status === 200) {
                setDisble(false)
                toast.success("Save Data Sucesfully!")

                getById(selectServicedata._id)
            }
        } catch (e) {
            console.log(e, 'error')
        }

    }

    const SaveData = (updatedItem) => {
        console.log(updatedItem, 'data')
        console.log(data)
        setData(data.map(item => {
            if (item._id === updatedItem._id) {
                return updatedItem;
            }
            return item;
        }
        ))
    }

    const SaveQuestion = (sectionId, questionId, updatedQuestion) => {
        const updatedData = data.map(item => {
            if (item._id === sectionId) {
                const updatedQuestions = item.questions.map(questionData => {
                    if (questionData._id === questionId) {
                        return updatedQuestion;
                    }
                    return questionData;
                });
                return { ...item, questions: updatedQuestions };
            }
            return item;
        });

        setData(updatedData);
    };


    const SaveQuestions = async (item, innerId) => {
        let url = `${process.env.REACT_APP_PORT}/admin/service/updateStep3questions`
        console.log(item, innerId)
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: item.question, description: item.description, mainCategoryid: selectServicedata._id, innerId: innerId, questionId: item._id })
            });
            if (response.status === 200) {
                toast.success("Save Data Sucesfully!")

                getById(selectServicedata._id)
            }
        } catch (e) {
            console.log(e, 'error')
        }

    };



    return (
        <>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <h5 className='card-title' style={{ fontWeight: "600" }}>Add section
                    <button type="button" className="btn btn-outline-primary" onClick={() => { AddSection("Add Section") }}>
                        <i className="bi bi-file-plus"></i>
                    </button>
                </h5>
                <div className="d-flex align-items-center">


                    <button type='submit' className='btn btn-primary' onClick={handleNext} disabled={disble}>Next</button>


                </div>
            </div>
            {data && data.map((sectionData, sectionindex) => {
                return (
                    <>
                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                            <h5 className='card-title' style={{ fontWeight: "600" }}>Service Attributes
                                <button type="button" className="btn btn-outline-primary" onClick={() => {
                                    // AddAttribute(sectionData.id);"Add Attribute"
                                    AddAttribute("Add Attribute", sectionData._id)
                                }}>
                                    <i className="bi bi-file-plus"></i>
                                </button>
                            </h5>
                            <div className="d-flex align-items-center">
                                <button type='submit' className='btn btn-danger' onClick={() => {
                                    DeleteSection("Delete Section", sectionData)
                                }} disabled={disble}>Delete</button>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label htmlFor='sectionHeading' className='col-sm-2 col-form-label'>Section Heading <span style={{ color: "red" }}>*</span></label>
                            <div className='col-sm-10'>
                                <input type='text' id='sectionHeading' placeholder='Enter Section Heading' className='form-control' value={sectionData.heading} onChange={(e) => {
                                    // handleInputChange(sectionData._id, null, 'heading', e.target.value);
                                    const updatedItem = { ...sectionData, heading: e.target.value };
                                    SaveData(updatedItem);
                                }} />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label htmlFor='sectionImage' className='col-sm-2 col-form-label'>Image</label>
                            <div className='col-sm-10 d-flex align-items-center'>
                                <div className="col-5">

                                    <input type='file' id='sectionImage' className='formFile'
                                        onChange={(e) => {
                                            const updatedItem = { ...sectionData, image: e.target.files[0] };
                                            SaveData(updatedItem);
                                        }} />
                                </div>
                                <div className="col-5">

                                    <img src={`${sectionData.image && sectionData.image}`} style={{ width: "120px" }} className="mb-1" alt="No Previous Image" />
                                </div>.

                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-sm-2 col-form-label'></label>
                            <div className='col-sm-10'>
                                <button type='submit' className='btn btn-primary' onClick={() => { SaveAttribute(sectionData) }} disabled={disble}>Save</button>
                            </div>
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope='col'>Questions</th>
                                    <th scope='col'>Description</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {sectionData?.questions?.map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td className="col-3">
                                                    <div className="all_div_step2">
                                                        <div className="col-10">
                                                            <input type='text' placeholder='Name' className='form-control' value={item.question} onChange={(e) => {
                                                                const updatedQuestion = { ...item, question: e.target.value };
                                                                SaveQuestion(sectionData._id, item._id, updatedQuestion);
                                                            }} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="col-4">
                                                    <div className="col-12">
                                                        <textarea placeholder='Description' className='form-control w-100 textarea_design' value={item.description} onChange={(e) => {
                                                            const updatedQuestion = { ...item, description: e.target.value };
                                                            SaveQuestion(sectionData._id, item._id, updatedQuestion);
                                                        }} />
                                                    </div>
                                                </td>
                                                <td className="col-1">
                                                    <div className="all_div_step2">

                                                        <button type="button" className="btn btn-sm btn-primary" onClick={() => { SaveQuestions(item, sectionData._id) }} disabled={disble}>Save</button>

                                                        <button type="button" className="btn btn-sm btn-danger" onClick={() => DeleteAttribute("Delete", item._id, sectionData._id)} disabled={disble}><i className="bi bi-trash"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                                {
                                    sectionData?.questions?.length === 0 &&
                                    <tr>
                                        <td colSpan={3} className="text-center">No Data</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </>
                )
            })}
        </>
    )
}

export default Step3;

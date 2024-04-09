

import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const Process = ({ setActiveTab, selectServicedata, getById }) => {

    const [data, setData] = useState();

    useEffect(() => {
        setData(selectServicedata.process)
    }, [selectServicedata.process])







    const handleNext = () => {
        setActiveTab('11');
    };




    const AddAttribute = async (innerId) => {
        let url = `${process.env.REACT_APP_PORT}/admin/service/addprocess`
        console.log(innerId)

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mainCategoryid: selectServicedata._id, innerId: innerId })
            });
            if (response.status === 200) {
                toast.success("Add Attribute Sucesfully!")

                getById(selectServicedata._id)
            }
        } catch (e) {
            console.log(e, 'error')
        }

    }



    const DeleteAttribute = async (type, id, innerId) => {
        let url = `${process.env.REACT_APP_PORT}/admin/service/deleteprocess`
        console.log(id, id)
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ innerCategoryid: id, mainCategoryid: selectServicedata._id, innerId: innerId })
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

        console.log(item)
        let url = `${process.env.REACT_APP_PORT}/admin/service/updateprocess`

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mainCategoryid: selectServicedata._id, innerId: item._id, heading: item.heading })
            });
            if (response.status === 200) {
                toast.success("save Attribute Sucesfully!")

                getById(selectServicedata._id)
            }
        } catch (e) {
            console.log(e, 'error')
        }

    }

    const SaveData = (updatedItem) => {
        setData(data.map(item => {
            if (item._id === updatedItem._id) {
                return updatedItem;
            }
            return item;
        }
        ))
    }

    const SaveQuestion = (sectionId, questionId, updatedQuestion) => {
        console.log(updatedQuestion,'update')
        const updatedData = data.map(item => {
            if (item._id === sectionId) {
                const updatedQuestions = item.processData.map(questionData => {
                    if (questionData._id === questionId) {
                        return updatedQuestion;
                    }
                    return questionData;
                });
                return { ...item, processData: updatedQuestions };
            }
            return item;
        });

        setData(updatedData);
    };


    const SaveQuestions = async (item, innerId) => {
        let url = `${process.env.REACT_APP_PORT}/admin/service/updateprocessStep`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ stepName: item.stepName, description: item.description, mainCategoryid: selectServicedata._id, innerId: innerId, questionId: item._id })
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
            <div style={{ display: 'flex', justifyContent: "end" }} className="mt-2">

                <div className="d-flex align-items-center">
                    <button type='submit' className='btn btn-primary' onClick={handleNext}>Next</button>
                </div>
            </div>
            {data && data.map((sectionData, sectionindex) => {

                return (
                    <>
                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                            <h5 className='card-title' style={{ fontWeight: "600" }}>Add Process
                                <button type="button" className="btn btn-outline-primary" onClick={() => {
                                    // AddAttribute(sectionData.id);"Add Attribute"
                                    AddAttribute(sectionData._id)
                                }}>
                                    <i className="bi bi-file-plus"></i>
                                </button>
                            </h5>

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
                            <label className='col-sm-2 col-form-label'></label>
                            <div className='col-sm-10'>
                                <button type='submit' className='btn btn-primary' onClick={() => { SaveAttribute(sectionData) }}>Save</button>
                            </div>
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope='col'>Step Name</th>
                                    <th scope='col'>Description</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {sectionData?.processData?.map((item, index) => {
                                    console.log(item ,)
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td className="col-3">
                                                    <div className="col-10">
                                                        <input type='text' placeholder='Name' className='form-control' value={item.stepName} onChange={(e) => {
                                                            const updatedQuestion = { ...item, stepName: e.target.value };
                                                            SaveQuestion(sectionData._id, item._id, updatedQuestion);
                                                        }} />
                                                    </div>
                                                </td>
                                                <td className="col-3">
                                                    <div className="col-10">
                                                        <textarea type='text' placeholder='Name' className='form-control w-100 textarea_design' value={item.description} onChange={(e) => {
                                                            const updatedQuestion = { ...item, description: e.target.value };
                                                            SaveQuestion(sectionData._id, item._id, updatedQuestion);
                                                        }} />
                                                    </div>
                                                </td>

                                                <td className="col-1">
                                                    <button type="button" className="btn btn-sm btn-primary" style={{ marginRight: "10px" }} onClick={() => { SaveQuestions(item, sectionData._id) }} >Save</button>

                                                    <button type="button" className="btn btn-sm btn-danger" onClick={() => DeleteAttribute("Delete", item._id, sectionData._id)}><i className="bi bi-trash"></i></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                                {
                                    sectionData?.details?.length === 0 &&
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

export default Process;
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import uploadFile from "../fileUpload/uploadFile";
import deleteFile from "../fileUpload/deleteFile";

const Step2 = ({ setActiveTab, selectServicedata, getById }) => {
    console.log(selectServicedata.stepTwoData, 'selectServicedata')
    const [disble, setDisble] = useState(false)

    const callBack = () => {
        setDisble(false)
    }
    const [data, setData] = useState()

    useEffect(() => {
        setData(selectServicedata.stepTwoData)
    }, [selectServicedata.stepTwoData])

    const handleDelete = async (item) => {
        let url = `${process.env.REACT_APP_PORT}/admin/service/deletestep2`
        console.log(item)
        setDisble(true)
        if (item.icon) {
            await deleteFile(item.icon, callBack);
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ innerCategoryid: item._id, mainCategoryid: selectServicedata._id })
            });
            if (response.status === 200) {
                toast.success("Delete data Sucesfully!")
                getById(selectServicedata._id)
            }
        } catch (e) {
            console.log(e, 'error')
        }

    };



    const SaveData = (updatedItem) => {
        setData(data.map(item => {
            if (item._id === updatedItem._id) {
                return updatedItem;
            }
            return item;
        }));
    };



    const AddAttributes = async (type) => {
        let url = `${process.env.REACT_APP_PORT}/admin/service/updateStep2`

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: type, mainCategoryid: selectServicedata._id })
            });
            if (response.status === 200) { getById(selectServicedata._id) }
        } catch (e) {
            console.log(e, 'error')
        }

    }


    const SaveAttributeData = async (item) => {

        let url = `${process.env.REACT_APP_PORT}/admin/service/updateStep2`
        setDisble(true)

        // const fileName = item?.icon ? item.icon.name + Date.now() : null
        // if (item.icon) {
        //     await uploadFile(fileName, item.icon, callBack)
        // }
        
        const myForm = new FormData();
        myForm.append('file', item.icon)
        myForm.append('mainCategoryid', selectServicedata._id)
        myForm.append('setp2dataid', item._id)
        myForm.append('name', item.name)
        myForm.append('description', item.description)

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


    return (
        <>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>

                <h5 className='card-title' style={{ fontWeight: "600" }}>Service Attributes <button type="button" class="btn btn-outline-primary" onClick={() => {
                    AddAttributes("Add Attributes")
                }}><i class="bi bi-file-plus"></i></button></h5>
                <div className="d-flex align-items-center">
                    {
                        disble ?
                            <button type='submit' className='btn btn-primary ' disabled>Next</button>
                            :
                            <button type='submit' className='btn btn-primary ' onClick={() => {
                                setActiveTab('3')
                            }}>Next</button>

                    }
                    
                </div>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Icon</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data?.length ? data.map((item, index) => {

                            return (
                                <>

                                    <tr key={index}>

                                        <td className="col-3">
                                            <div className="all_div_step2">

                                                <div className="col-10">
                                                    {/* <input type='text' placeholder='Name' value={item.name} className='form-control' onChange={(e) => { SaveData(e.target.value, item.id) }} /> */}
                                                    <input type='text' placeholder='Name' value={item.name} className='form-control' onChange={(e) => {
                                                        const updatedItem = { ...item, name: e.target.value };
                                                        SaveData(updatedItem);
                                                    }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-3">
                                            <div className="all_div_step2">

                                                <div className="col-12">
                                                    {/* <input type='file' placeholder='Name' className='form-control' /> */}

                                                    <img src={`${item.icon && item.icon}`} style={{ width: "120px" }} className="mb-1" alt="No Previous Image" />


                                                    <input type='file' placeholder='Icon' className='form-control' onChange={(e) => {
                                                        const updatedItem = { ...item, icon: e.target.files[0] };
                                                        SaveData(updatedItem);
                                                    }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-4">

                                            <div className="col-12 ">
                                                <textarea placeholder='Description' className='form-control w-100 textarea_design' value={item.description} onChange={(e) => {
                                                    const updatedItem = { ...item, description: e.target.value };
                                                    SaveData(updatedItem);
                                                }} />
                                                {/* <textarea className="w-100 textarea_design" style={{ border: "1px solid rgb(205, 223, 255)", borderRadius: "5px" }} /> */}
                                            </div>
                                        </td>
                                        <td className="col-1">
                                            <div className="all_div_step2">
                                                {
                                                    disble ?
                                                        <>

                                                            <button type="button" className="btn btn-sm btn-primary" style={{ marginRight: "3px" }} disabled>Save</button>

                                                            <button type="button" className="btn btn-sm btn-danger" disabled><i class="bi bi-trash"></i></button>
                                                        </>

                                                        :

                                                        <>
                                                            <button type="button" className="btn btn-sm btn-primary" style={{ marginRight: "3px" }} onClick={() => { SaveAttributeData(item) }}>Save</button>

                                                            <button type="button" className="btn btn-sm btn-danger" onClick={() => handleDelete(item)}><i class="bi bi-trash"></i></button>

                                                        </>

                                                }
                                            </div>
                                        </td>


                                    </tr>


                                </>
                            )
                        }) :
                            <></>

                    }

                    {
                        data?.length === 0 &&
                        <tr>
                            <td colSpan={3} className="text-center">No Data</td>
                        </tr>
                    }

                </tbody>

            </table>

        </>
    )
}

export default Step2
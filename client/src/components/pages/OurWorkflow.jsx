import React from 'react'
// import Group from "../images/Group.png";
import workFlow from "../images/workflow.gif"
import { MdOutlineSecurity,MdBusinessCenter } from "react-icons/md";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { GiMoebiusTriangle } from "react-icons/gi";
import { TbReceiptTax } from "react-icons/tb";
const OurWorkflow = () => {
  return (
    <div>
      <div className=" px-5">
                <h1 className="text-center pt-5 heading_main">Our Work Flow</h1>
                  <div className="row " >
                      <div className="col-lg-6 col-12 px-sm-5 py-sm-2 mx-auto">
                          <div className='px-sm-4 py-sm-5 px-2 py-3' >
                              <div className='card py-sm-3 px-sm-5  py-1 px-3 bg_color' >
                                <label className='text_workflow'><span className=''><MdOutlineSecurity /></span><span className='ps-3'>Search & Select Services</span></label>
                              </div>
                              <div className='card mt-4 py-sm-3 px-sm-5  py-1 px-3 ' style={{ background: "#FEB444"}} >
                                <label className='text_workflow'><span className='fs-4'><MdBusinessCenter /></span><span className='ps-3'>Login to your A/C </span></label>
                              </div>
                              <div className='card mt-4 py-sm-3 px-sm-5  py-1 px-3  bg_color' >
                                <label className='text_workflow'> <span className='fs-4'><TbReceiptTax /></span><span className='ps-3'>Upload the documents </span></label>
                              </div>
                              <div className='card mt-4 py-sm-3 px-sm-5  py-1 px-3 '  style={{ background: "#FEB444" }}>
                                <label className='text_workflow'> <span className='fs-4'><FaArrowRightArrowLeft /></span><span className='ps-3'>Make the payment </span></label>
                              </div>
                              <div className='card mt-4 py-sm-3 px-sm-5  py-1 px-3  bg_color' >
                                <label className='text_workflow'> <span className='fs-4'><MdOutlineSecurity /></span><span className='ps-3'>Service done by our professional Team </span></label>
                              </div>
                              {/* <div className='card mt-4 py-3 px-5' style={{ background: "#FEB444" }}> 
                                <label className='text_workflow'> <span className='fs-4'><GiMoebiusTriangle /></span><span className='ps-3'>EPR & BIS </span></label>
                              </div> */}
                          </div>
                      </div>
                      <div className="col-lg-6 col-12 pt-5">
                              <img src={workFlow } alt="workflow" className='container-fluid'/>     
                      </div>
                      
                  </div>
                
            </div>
    </div>
  )
}

export default OurWorkflow

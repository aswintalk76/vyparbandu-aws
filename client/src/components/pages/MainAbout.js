import Footer from "./Footer"
import Header from "./Header"
import groupImage from '../../components/images/pexels-thirdman-5583250.jpg'
import mission from '../../components/images/mission.jpg'
import Vision from '../../components/images/vision.jpg'
import ContactUs from "./ContactUs"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import WhyVyapar from "./WhyVyapar"
import Review from "./Review"
import Testimonials from "./TestiMonials"

const MainAbout = () => {
    const { pathname } = useLocation();

    const [documentList, setDocumentList] = useState();


    const getList = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PORT}/admin/about/getData`);
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


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <>
            <Header />
            <div className="container">
                <div className="my-5 px-sm-5 mx-sm-5">
                    <div className="mb-5">
                        {
                            documentList?.map((item) => {
                                return (
                                    <>
                                        <h1 className="text-center heading_main mb-3">{item?.heading}</h1>
                                        <h4 className="text-center " >{item?.subheading}</h4>
                                        <div className="mt-5 about_div">
                                            <p className='f_20'>
                                                <pre style={{ width: '100%', whiteSpace: 'pre-wrap', textAlign: 'justify', fontFamily: 'inherit' , fontSize:"20px" , fontWeight:"400" }}>

                                                    {item?.description}
                                                </pre>
                                            </p>


                                        </div>

                                        <div className="mt-3 mb-5">

                                            <h1 className="text-center heading_main mb-5 mt-5">{item?.otherdata?.heading}</h1>
                                            <div className="">
                                                <img src={item?.otherdata?.image ? item?.otherdata?.image : groupImage} alt="GroupImg" style={{ borderRadius: "10px" }} className="w-100" />
                                            </div>
                                            <div className="mt-5 mb-5 ">
                                                <p className='f_20'>
                                                    <pre style={{ width: '100%', whiteSpace: 'pre-wrap', textAlign: 'justify', fontFamily: 'inherit' , fontSize:"20px" , fontWeight:"400" }}>

                                                        {item?.otherdata?.details}
                                                    </pre>
                                                </p>



                                            </div>
                                        </div>
                                        <div className="mt-5">

                                            <div className="">
                                            </div>
                                            <div className="row mt-5 d-flex" style={{ justifyContent: "space-between" }}>
                                                {
                                                    item?.otherdata?.data.map((data) => {
                                                        return (
                                                            <>

                                                                <div className="col-lg-5 about_vision p-4 mb-3">

                                                                    <h2 className="text-center heading_main" style={{ color: "white" }}>{data?.heading}</h2>

                                                                    <div className="p-2">

                                                                        <img src={item?.image ? item.image : mission} alt="misiion" style={{ borderRadius: "10px" }} className="w-100" />
                                                                    </div>
                                                                    <div className="p-2">

                                                                        <p className='f_20'>
                                                                            <pre style={{ width: '100%', whiteSpace: 'pre-wrap', textAlign: 'justify', fontFamily: 'inherit' , fontSize:"20px" , fontWeight:"400"  , color:"white"}}>

                                                                                {data?.description}
                                                                            </pre>

                                                                        </p>

                                                                    </div>

                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }
                                                {/* <div className="col-lg-5 about_vision  p-4">
                                                    <h2 className="text-center heading_main" style={{ color: "white" }}>Our Vision</h2>

                                                    <div className="p-2">

                                                        <img src={Vision} alt="vision" style={{ borderRadius: "10px" }} className="w-100" />
                                                    </div>
                                                    <div className="p-2">

                                                        <p className='f_20'>

                                                            Our Vision
                                                            “To be known for most reliable and world-class business consultant.”
                                                        </p>

                                                    </div>
                                                </div> */}
                                            </div>

                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>


                </div>
            </div>
            <WhyVyapar />
            <Review />
            <Testimonials />
            <ContactUs />
            <Footer />

        </>
    )
}

export default MainAbout
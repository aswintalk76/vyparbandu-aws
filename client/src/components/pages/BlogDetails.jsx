import { useEffect, useState } from "react"
import Footer from "./Footer"
import Header from "./Header"
import '../styles/blog.css'
import blog from '../images/blog.png'
import popular from '../images/blog-popular.png'
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"

const BlogDetails = () => {
    const [blogdata, setBlogData] = useState()
    const [popularBlog, setPopularBlog] = useState([
        { img: popular, heading: "Apple Introduces Search Ads Basic", date: "jun 22, 2018" },
        { img: popular, heading: "new rules, more cars, more races", date: "jun 8, 2018" },
    ])

    const location = useLocation();

    console.log(location.state, 'location')
    const getList = async (dataId) => {

        let url = `${process.env.REACT_APP_PORT}/admin/blog/getById`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: location.state })
            });
            const data = await response.json();

            if (response.status === 200) {
                setBlogData(data)
            }
        } catch (e) {
            console.log(e, 'error')
        }


    }

    useEffect(() => {
        getList();
    }, [location.state])

    function getVideoId(url) {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

        const match = url.match(regExp);

        if (match && match[1]) {
            return match[1];
        } else {
            return null;
        }
    }

    return (
        <>
            <Header />
            <div id="main-content" class="blog-page mt-5 mb-5">
                <div class="container">
                    <div class="row clearfix">
                        <div class="col-lg-12 col-md-12 left-box">

                            <div class="card single_post">
                                <div class="body">
                                    <div class="img-post">
                                        <img class="d-block img-fluid" style={{ width: "-webkit-fill-available" }} src={`${blogdata?.image && blogdata?.image}`} alt="First slide" />
                                    </div>
                                    <h3 className="d-flex justify-content-center heading_main">{blogdata?.heading}</h3>
                                    <p>
                                        <pre style={{ width: '100%', whiteSpace: 'pre-wrap', textAlign: 'justify', fontFamily: 'inherit', fontSize: "20px", fontWeight: "400" }}>

                                            {blogdata?.details}
                                        </pre>
                                        </p>
                                    {
                                        blogdata?.link &&

                                        <div className="mt-3 mb-3" style={{ padding: "20px" }}>
                                            <iframe
                                                title="YouTube video player"
                                                width="100%"
                                                height="400"
                                                src={`https://www.youtube.com/embed/${getVideoId(blogdata?.link)}`}
                                                allowFullScreen
                                                style={{ borderRadius: "20px" }}>

                                            </iframe>

                                        </div>
                                    }
                                    <p>
                                        <pre style={{ width: '100%', whiteSpace: 'pre-wrap', textAlign: 'justify', fontFamily: 'inherit', fontSize: "20px", fontWeight: "400" }}>
                                            {blogdata?.description}
                                        </pre>
                                    </p>
                                </div>
                                <div class="footer">
                                    {/* <div class="actions">
                                                        <a href="javasc ript:void(0);" class="btn btn-outline-secondary">Continue Reading</a>
                                                    </div> */}
                                    {/* <ul class="stats">
                                        <li><a href="javascript:void(0);">General</a></li>
                                        <li><a href="javascript:void(0);" class="fa fa-heart">28</a></li>
                                        <li><a href="javascript:void(0);" class="fa fa-comment">128</a></li>
                                    </ul> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default BlogDetails
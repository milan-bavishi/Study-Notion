import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setProgress } from "../slices/loadingBarSlice"
import HignlightText from "../Components/core/HomePage/HighlightText";
import CTAButton from "../Components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../Components/core/HomePage/CodeBlocks";
import TimelineSection from "../Components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../Components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../Components/core/HomePage/InstructorSection"
import ExploreMore from "../Components/core/HomePage/ExploreMore"
import Footer from "../Components/common/Footer"
import NavBar from "../Components/common/NavBar";
import RatingSlider from "../Components/core/Ratings/RatingSlider";


function Home() {

    const dispatch = useDispatch();
    return(
        
        <div>
        
            {/*Section 1 */}

            <div className="mx-auto relative flex flex-col w-11/12 items-center
            text-white justify-between  ">

                <Link onClick={()=>{dispatch(setProgress(100))}} to={"/signup"}>
                    <div className=" group mt-16 p-1 mx-auto rounded-full bg-richblack-800
                    font-bold transition-all duration-200 hover:scale-95 w-fit max-w-maxContent">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                            <p> Become an Instructor</p>
                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>

                <div className="text-center text-3xl md:text-4xl font-semibold mt-7">
                    Empower Your Future With <HignlightText text={"Coding Skills"}/> 
                </div>
                <div className="mt-4 w-[90%] text-left md:text-center text-sm md:text-lg font-bold text-richblack-300">
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className="flex flex-row gap-7 mt-8">
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
                </div>

                <div className="mx-3 my-12 shadow-blue-200 shadow-[10px_-5px_50px_-5px]">
                    <video className=" shadow-[20px_20px_rgba(255,255,255)]"
                    muted
                    loop
                    autoPlay
                    >
                        <source src = {Banner} type="video/mp4"/>
                    </video>
                </div>

                <div>
                    <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className="font-semiblod text-2xl lg:text-4xl sm:w-full">
                            Unlock Your
                            <HignlightText text={"Coding Potential "}/>
                             with our online courses
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have year of experience in coding and are passionate about sharing their knoeledge with yoy."
                    }
                    ctabtn1={
                        {
                            btnText: "Try it Yourself",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "learn more",
                            linkto: "/login",
                            active: false,
                        }
                    }
                    
                    codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                    codeColor={"white"}
                    backgroundGradient={"grad"}>
                    </CodeBlocks>
                </div>

                <div>
                <CodeBlocks 
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Start
                        <HignlightText text={"coding in seconds"}/>
                    </div>
                }
                subheading = {
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctabtn1={
                    {
                        btnText: "Continue Lesson",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "learn more",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                codeColor={"text-yellow-25"}
                backgroudGradient={"grad2"}
            />
                </div>

                <ExploreMore/>
            </div>

            {/*Section 2 */}
            <div className="bg-pure-greys-5 text-richblack-700">
                <div className="homepage_bg h-[310px]">
                    <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
                        <div className="h-[150px]"></div>
                        <div className="flex flex-row gap-7 text-white">
                        <CTAButton active={true} linkto={"/catalog/web Developement"}>
                            <div className="flex items-center gap-3">
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                            </CTAButton>

                        <CTAButton active={false} linkto={"/signup"}>
                        <div>
                            Learn more
                        </div>
                        </CTAButton>
                        </div>
                    </div>
                </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">

                    <div className="flex flex-row gap-5 mb-10 mt-[95px]">
                        <div className="text-4xl font-semibold w-[45%]">
                            Get the Skill you need for a
                            <HignlightText text={"Job that is in demand"}/>
                        </div>

                        <div className="flex flex-col gap-10 w-[40%] items-start">
                            <div className="text-[16px]">
                                The modern StudyNotion is the disctates its own terms. Today, to be a competitive specialist requires more than professional skills. 
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div>
                                    Learn more
                                </div>
                            </CTAButton>    
                        </div>
                    </div>

                    {/*timelinesection*/}
                    
                    <TimelineSection/>
                    <LearningLanguageSection/>
                    {/*Learn lamguage section*/}
                </div>
            </div>    
            {/*Section 3 */}


            <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
                    <InstructorSection/>
            </div>        
            {/*Section 4 */}
            <div className="mb-16 mt-3">
                <h2 className="text-center text-2xl md:text-4xl font-semibold mt-8 text-richblack-5 mb-5">Reviews from other learners</h2>
                <RatingSlider/>
            </div>
        </div>
    )
}

export default Home;
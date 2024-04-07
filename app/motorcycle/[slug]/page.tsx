"use client"
import NavbarTwo from '../../components/navbar2/navbarTwo.jsx';
import ImageDisplay from "../../components/imageDIsplay/imageDisplay"
import FmdBadIcon from '@mui/icons-material/FmdBad';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./motorcycle.css";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation.js';
import { features, specifications } from "../../service/common"
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

interface Motorcycle {
    motorcycle_name: string;
    variant: any;
    brand_name: string;
}

interface variant {
    variant_name: string;
    _id: string;
}

export default function Motorcycle() {

    const [motorcycleData, setMotorcycleData] = useState<Motorcycle | null>(null);
    const [images, setimages] = useState([])
    const [variant, setVariant] = useState<variant | null>(null)
    const params = useParams()
    const [variantList, setVariantList] = useState([])
    const [showAllFeatures, setShowAllFeatures] = useState(false);
    const [isSticky, setIsSticky] = useState<boolean>(true);
    const [variantDropdown, setvariantDropdown] = useState(false)
    const [initialRender, setInitialRender] = useState(false)


    const getMotorcycleData = async () => {
        try {
            let data = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}api/v1/user/motorcycle/getById?motorcycleID=${params.slug}&variantId=${variant?._id ? variant?._id : ""}`)
            setMotorcycleData(data.data.data)
            setimages(data.data.data.images)
            console.log(data.data.data);
            setInitialRender(true)
        } catch (err) {
            console.log(err);
        }
    }

    const getVariants = async () => {
        console.log(process.env);

        try {
            let data = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}api/v1/user/variant/variant-list/${params.slug}`)
            setVariantList(data.data.data)
            setVariant(data.data.data[0])
            getMotorcycleData()
        } catch (err) {
            console.log(err);
        }
    }

    const variantHandler = (variant: variant) => {
        setvariantDropdown(false)
        setVariant(variant)
        getMotorcycleData()
    }


    useEffect(() => {
        getVariants()
    }, [])


    useEffect(() => {
        const handleScroll = () => {
            const screenWidth = window.innerWidth;
            // Check if screen width is greater than 1024px
            if (screenWidth > 1024) {
                const leftDiv = document.querySelector('.image_display_container') as HTMLElement;
                const rightDiv = document.querySelector('.container_4') as HTMLElement;
                const leftDivRect = leftDiv.getBoundingClientRect();
                const rightDivRect = rightDiv.getBoundingClientRect();

                if (rightDivRect.bottom <= leftDivRect.height) {
                    setIsSticky(false); // Remove sticky behavior
                } else {
                    setIsSticky(true); // Add sticky behavior
                }
            }
        };



        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    return (
        <>
            <NavbarTwo />

            <div className='body_outer'>
                {variantDropdown && <div onClick={() => setvariantDropdown(false)} className='variant_droodwon_backdrop'></div>}
                <div className='body_inner'>
                    <div className='main_container'>
                        <div className='left_container'>
                            <ImageDisplay images={images} sticky={isSticky} />
                        </div>
                        <div className='right_container'>
                            {initialRender ? <div className='container_1'>
                                <div className='price_container'>
                                    <h2 className='motorcycle_name'>{motorcycleData?.motorcycle_name}</h2>
                                    <h3 className='motorcycle_price'><span>Price :</span> ₹ {motorcycleData?.variant?.price}</h3>
                                    <p className="helper_text">EX-Showroom Price</p>
                                </div>
                                <div className='share_like_container'>
                                    <button><FavoriteBorderIcon /></button>
                                    <button><ShareIcon /></button>
                                </div>
                            </div> : <div className="load-wraper price_display">
                                <div className="activity"></div>
                            </div>}

                           {initialRender ?  <div className='container_2'>
                                <div className='variant_box' onClick={() => setvariantDropdown(!variantDropdown)}>
                                    <span><b>Variant</b> : <p> &nbsp;{variant?.variant_name}</p></span>
                                    <ArrowDropDownCircleIcon />
                                </div>

                                <div className={variantDropdown ? 'variant_dropdown slide' : 'variant_dropdown'}>
                                    <ul>
                                        {
                                            variantList.length > 0 && variantList.map((variant: any) => {
                                                return (<li onClick={() => variantHandler(variant)}>{variant?.variant_name}</li>)
                                            })
                                        }

                                    </ul>

                                </div>
                            </div> : <div className="load-wraper variant_display">
                                <div className="activity"></div>
                            </div>}



                           {initialRender ?  <div className='container_3'>
                                <div className='head'><b>Key Specs</b></div>
                                <div className='body first_body'>
                                    <div className='key_spec_container'>
                                        <img src='/brand-image.png' />
                                        <div className='single_spec_container'>
                                            <p>Brand</p>
                                            <span>{motorcycleData?.brand_name}</span>
                                        </div>
                                    </div>

                                    <div className='key_spec_container'>
                                        <img src='/piston.png' />
                                        <div className='single_spec_container'>
                                            <p>Displacement</p>
                                            <span>{motorcycleData?.variant?.specifications?.displacement}</span>
                                        </div>
                                    </div>

                                    <div className='key_spec_container'>
                                        <img src='/energetic.png' />
                                        <div className='single_spec_container'>
                                            <p>Max Power</p>
                                            <span>{motorcycleData?.variant?.specifications?.maxPower.split('@')[0]}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='body'>
                                    <div className='key_spec_container'>
                                        <img src='/acceleration.png' />
                                        <div className='single_spec_container'>
                                            <p>Max Torque</p>
                                            <span>{motorcycleData?.variant?.specifications?.maxTorque.split('@')[0]}</span>
                                        </div>
                                    </div>

                                    <div className='key_spec_container'>
                                        <img src='/gas-pump.png' />
                                        <div className='single_spec_container'>
                                            <p>Mileage</p>
                                            <span>{motorcycleData?.variant?.specifications?.mileageOwnerReported}</span>
                                        </div>
                                    </div>

                                    <div className='key_spec_container'>
                                        <img src='/scales.png' />
                                        <div className='single_spec_container'>
                                            <p>Weight</p>
                                            <span>{motorcycleData?.variant?.specifications?.kerbWeight}</span>
                                        </div>
                                    </div>
                                </div>
                            </div> : <div className="load-wraper key_spec_display">
                                <div className="activity"></div>
                            </div>}


                           {initialRender ? <div className='container_4'>
                                <div className='head'><b>Features</b></div>
                                <ul>
                                    {motorcycleData?.variant.features && Object.keys(motorcycleData?.variant.features).map((feature, index) => (
                                        (showAllFeatures || index < 5) && (
                                            <li key={index}>
                                                <div className='single_feature_container feature_name'>{features[feature]}</div>
                                                <div className='single_feature_container'><img src='/right_arrow_black.png' /> <span>{motorcycleData?.variant.features[feature] ? motorcycleData?.variant.features[feature] : '- -'}</span></div>
                                            </li>
                                        )
                                    ))}
                                    {motorcycleData?.variant.features && Object.keys(motorcycleData?.variant.features).length > 5 && (
                                        <li>
                                            <button className='see_more_btn' onClick={() => setShowAllFeatures(!showAllFeatures)}>
                                                {showAllFeatures ? 'See less' : "See more"}
                                                {showAllFeatures ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>  : <div className="load-wraper feature_display">
                                <div className="activity"></div>
                            </div>}
                        </div>
                    </div>

                    <div className='container_5'>
                        <div className='container_5_head'><b>Specifications</b></div>
                        <div className="container_5_body">
                            <div className='container_5_body_inner'>
                                <div className='head'>Power & Performance  <img src='/right-arrow.png' /></div>
                                <ul>
                                    {specifications.powerPerfomance.map((specification, index) => {
                                        const key = Object.keys(specification)[0] as keyof typeof specification; // Type assertion
                                        const value = Object.values(specification)[0] as keyof typeof specification;
                                        return (
                                            <li key={index}>
                                                <span>{value} <img src='/right_arrow_black.png' /> </span> {motorcycleData?.variant?.specifications[key] ? motorcycleData?.variant?.specifications[key] : 'N/A'}
                                            </li>
                                        );
                                    })}
                                </ul>

                            </div>
                        </div>

                        <div className="container_5_body">
                            <div className='container_5_body_inner'>
                                <div className='head'>Brakes, Wheels & Suspension <img src='/right-arrow.png' /></div>
                                <ul>
                                    {specifications.brakeWheelSuspnsion.map((specification, index) => {
                                        const key = Object.keys(specification)[0] as keyof typeof specification; // Type assertion
                                        const value = Object.values(specification)[0] as keyof typeof specification;
                                        return (
                                            <li key={index}>
                                                <span>{value} <img src='/right_arrow_black.png' /></span> {motorcycleData?.variant?.specifications[key] ? motorcycleData?.variant?.specifications[key] : 'N/A'}
                                            </li>
                                        );
                                    })}
                                </ul>

                            </div>
                        </div>

                        <div className="container_5_body">
                            <div className='container_5_body_inner'>
                                <div className='head'>Dimensions & Chassis  <img src='/right-arrow.png' /></div>
                                <ul>
                                    {specifications.dimensionChassis.map((specification, index) => {
                                        const key = Object.keys(specification)[0] as keyof typeof specification; // Type assertion
                                        const value = Object.values(specification)[0] as keyof typeof specification;
                                        return (
                                            <li key={index}>
                                                <span>{value}  <img src='/right_arrow_black.png' /></span> {motorcycleData?.variant?.specifications[key] ? motorcycleData?.variant?.specifications[key] : 'N/A'}
                                            </li>
                                        );
                                    })}
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
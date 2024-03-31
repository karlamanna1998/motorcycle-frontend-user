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
import { features } from "../../service/common"
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
    const [isSticky, setIsSticky] = useState<boolean>(false);


    const getMotorcycleData = async () => {
        try {
            let data = await axios.get(`http://localhost:5000/api/v1/user/motorcycle/getById?motorcycleID=${params.slug}&variantId=${variant?._id ? variant?._id : ""}`)
            setMotorcycleData(data.data.data)
            setimages(data.data.data.images)
            console.log(data.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    const getVariants = async () => {
        try {
            let data = await axios.get(`http://localhost:5000/api/v1/user/variant/variant-list/${params.slug}`)
            setVariantList(data.data.data)
            setVariant(data.data.data[0])
            getMotorcycleData()
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getVariants()
    }, [])


    useEffect(() => {
        const handleScroll = () => {
            const leftDiv = document.querySelector('.image_display_container') as HTMLElement;
            const rightDiv = document.querySelector('.container_4') as HTMLElement;
            const leftDivRect = leftDiv.getBoundingClientRect();
            const rightDivRect = rightDiv.getBoundingClientRect();

            if (rightDivRect.bottom <= leftDivRect.height) {
                setIsSticky(false); // Remove sticky behavior
            } else {
                setIsSticky(true); // Add sticky behavior
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
                <div className='body_inner'>
                    <div className='main_container'>
                        <div className='left_container'>
                            <ImageDisplay images={images} sticky={isSticky} />
                        </div>
                        <div className='right_container'>
                            <div className='container_1'>
                                <div className='price_container'>
                                    <h2 className='motorcycle_name'>{motorcycleData?.motorcycle_name}</h2>
                                    <h3 className='motorcycle_price'><span>Price :</span> ₹ {motorcycleData?.variant?.price}</h3>
                                    <p className="helper_text">EX-Showroom Price</p>
                                </div>
                                <div className='share_like_container'>
                                    <button><FavoriteBorderIcon /></button>
                                    <button><ShareIcon /></button>
                                </div>
                            </div>

                            <div className='container_2'>
                                <span>Variant : <p> &nbsp;{variant?.variant_name}</p></span>
                                <ArrowDropDownCircleIcon />
                            </div>

                            <div className='container_3'>
                                <div className='head'>Key Specs</div>
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
                            </div>


                            <div className='container_4'>
                                <div className='head'>Features</div>
                                <ul>
                                    {motorcycleData?.variant.features && Object.keys(motorcycleData?.variant.features).map((feature, index) => (
                                        (showAllFeatures || index < 5) && (
                                            <li key={index}>
                                                <div className='single_feature_container'>{features[feature]}</div>
                                                <div className='single_feature_container'>{motorcycleData?.variant.features[feature] ? motorcycleData?.variant.features[feature] : '-'}</div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
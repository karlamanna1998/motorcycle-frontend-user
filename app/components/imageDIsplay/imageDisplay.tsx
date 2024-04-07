import './imageDisplay.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useRef, useState } from 'react';
export default function ImageDisplay({ images, sticky }: { images: string[], sticky: boolean }) {
    const [viewingImage, setViewingImage] = useState("")
    

    const imagesListRef : any = useRef(null);

    const scrollDown = () => {
        if (imagesListRef.current) {
            imagesListRef.current.scrollLeft  += 90;
        }
    };

    const scrollUp = () => {
        if (imagesListRef.current) {
            imagesListRef.current.scrollLeft  -= 90;
        }
    };

    const nexImage = ()=>{
        if(images.indexOf(viewingImage) == images.length - 1){
            setViewingImage(images[0])
        }else{
            setViewingImage(images[images.indexOf(viewingImage) + 1])
        }
    }


    const previousImage = ()=>{

        if(images.indexOf(viewingImage) == 0){
            setViewingImage(images[images.length - 1])

        }else{
            setViewingImage(images[images.indexOf(viewingImage) - 1])
        }
      }

    useEffect(() => {
        setViewingImage(images[0])
    }, [images])
    return (
        <>
        {
            images.length > 0  &&  <div className={sticky ? 'image_display_container sticky' : 'image_display_container'}>
            <div className='image_list_wrapper'>
                <div className='images_list' ref={imagesListRef}>
                    {
                        images.length > 0 && images.map((item, i) => {
                            return (
                                <div key={i} className={viewingImage == item ? 'single_Image_container active' : 'single_Image_container'} onClick={()=>setViewingImage(item)}>
                                    <img className={viewingImage == item ? 'single_image active' : 'single_image'} src={'https://d22modxfw04m0o.cloudfront.net/' + item} />
                                </div>
                            )
                        })
                    }

                </div>
                <button className='up_btn' onClick={scrollUp}><KeyboardArrowLeftIcon /></button>
                <button className='down_btn' onClick={scrollDown}><KeyboardArrowRightIcon /></button>
            </div>

            {images.length > 0 && <div className='main_image'>
                <button className='left_btn' onClick={previousImage}><KeyboardArrowLeftIcon /></button>
                {viewingImage &&  <img src={'https://d22modxfw04m0o.cloudfront.net/' + viewingImage} />}
                <button className='right_btn' onClick={nexImage}><KeyboardArrowRightIcon /></button>
                <div className='count_display'>{images.indexOf(viewingImage) + 1}/{images.length}</div>
            </div>}
        </div>
        }
        {
            images.length == 0 && <div className="load-wraper image_display">
            <div className="activity"></div>
        </div>
        }
        </>
       
    );
}



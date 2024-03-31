import './imageDisplay.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export default function ImageDisplay({ images , sticky }: { images: string[] , sticky : boolean }) {
    return (
        <div className={sticky ? 'image_display_container sticky' : 'image_display_container'}>
            <div className='image_list_wrapper'>
            <div className='images_list'>
                {
                    images.length > 0 && images.map((item , i)=>{
                        return (
                            <div key={i} className='single_Image_container'>
                            <img src={'https://d22modxfw04m0o.cloudfront.net/' + item}/>
                            
                        </div>
                        )
                    })
                }

            </div>
            <button className='up_btn'><KeyboardArrowUpIcon/></button>
            <button className='down_btn'><KeyboardArrowDownIcon/></button>
            </div>
          
            {images.length > 0 && <div className='main_image'>
            <button className='left_btn'><KeyboardArrowLeftIcon/></button>
            <img src={'https://d22modxfw04m0o.cloudfront.net/' + images[0]}/>
            <button className='right_btn'><KeyboardArrowRightIcon/></button>
            <div className='count_display'>15/18</div>
            </div>}
        </div>
    );
}

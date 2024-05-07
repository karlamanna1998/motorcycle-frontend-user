import axios from "axios";
import './single-motorcycle.css'
import FilterSort from "../components/search-motorcycles/filterSort/filterSort";

export default async function SearchMotorcycle({ searchParams: { brand = '', sort = '', budget = '', displacement = '', brake = '' } }: {
    searchParams: {
        brand: string,
        sort: string,
        displacement: string,
        brake: string,
        budget: string
    }
}) {

    const payload = {
        brand,
        brake,
        sort,
        displacement: displacement ? {
            min: Number(displacement.split(',')[0]),
            max: Number(displacement.split(',')[1])
        } : '',
        budget: budget ? {
            min: Number(budget.split(',')[0]),
            max: Number(budget.split(',')[1])
        } : ''
    }
     
    let data = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}api/v1/user/motorcycle/list`, payload);
    let motorcycles = data.data
    return (
        <div className='body_outer'>
        <div className='body_inner'>
            <FilterSort/>
            <div className="moto_card_container">
            {
              motorcycles &&  motorcycles.map((item : any)=>{
                   return <>
                   <a>
                    <div className="moto_card">
                    <div className='image_wrapper'>
                    <img src={'https://d22modxfw04m0o.cloudfront.net/' + item.display_image_url} />
                    <div className="info_container">
                    <p className="moto_Name">{item.motorcycle_name}  </p>
                    {/* <div className="style_spacer"></div> */}
                    <p className="moto_price">Price : ₹ {item.variant.price}</p>
                    <p className="spec_text">{item.variant.specifications?.displacement} | {item.variant.specifications?.maxPower.split('@')[0]} | {item.variant.specifications?.kerbWeight}</p>
                    <button className="view_details_btn">View Details</button>
                    </div>
                    </div>
                    </div>
                   </a>
                   </>
                })
            }
            </div>
        </div>
        </div>

    )
}
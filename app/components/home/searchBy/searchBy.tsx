'use client'
type Brand = {
    brand_name: string;
    logo_url: string;
    _id: string;
  };

export default function SearchBy({brandList } : {
    brandList : Brand[]
}){
    return (
        <div className="search_bikes_by_container">
              <h1 className="title"><span>S</span>earch Bikes By</h1>
              <div className='btn_container'>
                <button className="tab_btn">BRAND</button>
                <button  className="tab_btn">DISPLACEMENT</button>
                <button  className="tab_btn">BUDGET</button>
              </div>

              <div className='brand_container'>
                {
                  brandList && brandList.map((brand: Brand, i: number) => {
                    return (<div className="brand_card">
                      <img src={'https://d22modxfw04m0o.cloudfront.net/' + brand.logo_url} />
                      {/* <button>{brand.brand_name}</button> */}
                      <p>{brand.brand_name}</p>
                    </div>)
                  })
                }

              </div>
            </div>
    )
}
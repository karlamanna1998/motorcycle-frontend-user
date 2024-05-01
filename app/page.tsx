"use client"
import Image from "next/image";
import "./page.css";
import { use, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/navbar/navbar";
import Link from "next/link";
import NavbarTwo from "./components/navbar2/navbarTwo";

type Motorcycle = {
  _id: string;
  motorcycle_name: string;
};

type Brand = {
  brand_name: string;
  logo_url: string;
  _id : string;
};

export default async function Home() {
  const [search, setSearch] = useState<string>("")
  const [searchResult, setSearchResult] = useState<Motorcycle[]>([])
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const [renderNavbarOne, setrenderNavbarOne] = useState(false);



  const [selectedSearchMethod , setselectedSearchMethod] = useState('brand')
  // const [brandList , setBrandList] = useState<Brand[]>([])

  let data = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}api/v1/user/brand/get-all-brand`);
  let brandList = data.data.data

  const seachHandler = async (event: any) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    let timer = setTimeout(async () => {
      try {
        let motorcycledata = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}api/v1/user/motorcycle/search-list?search=${searchTerm}`)
        setSearchResult(motorcycledata.data.data)
      } catch (err) {
        console.error(err);
      }
    }, 400)

    setDebounceTimer(timer)
  }

  // useEffect(() => {
  //   document.addEventListener('scroll', () => {

  //     if (window.scrollY + 70 >= window.innerHeight) {
  //       setrenderNavbarOne(false)
  //     } else {
  //       setrenderNavbarOne(true)
  //     }
  //     console.log(window.scrollY,)
  //   })

  //   return (
  //     document.removeEventListener('scroll', () => { })
  //   )
  // }, [])

  // useEffect(()=>{
  //   (async ()=>{
  //    try{
  //     let data = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}api/v1/user/brand/get-all-brand`)
  //     setBrandList(data.data.data)
  //    }catch(e){
  //      console.log(e);
  //    }
  //   })()
  // } , [])


  return (
    <>
      {renderNavbarOne ? <Navbar /> : <NavbarTwo />}

      <section id="firstSection">

        <div className="search_section">
          <div className="search_container">
            <label className='heading_search'>FIND YOUR DREAM BIKE</label>
            <div className='search_wrapper'>
              {!search && <span className='search_placeholder'>Search</span>}
              <input type="text" placeholder="" onChange={(e) => seachHandler(e)} />
              <img src="./magnifying-glass-solid.svg" />
            </div>
            {<div className='search_result_container' style={{ height: searchResult.length == 0 ? '0' : searchResult.length * 50 + 'px' }}>
              <ul>
                {
                  searchResult.length != 0 && searchResult.map((item: Motorcycle, i: number) => {
                    return (
                      <li key={i}><Link href={`/motorcycle/${item._id}`}>{item.motorcycle_name}</Link></li>
                    )
                  })
                }
              </ul>
            </div>}
          </div>
        </div>

      </section>


      <section>
        <div className='body_outer'>
          <div className='body_inner'>
            <div className="search_bikes_by_container">
              <h1 className="title"><span>S</span>earch Bikes By</h1>
              <div className='btn_container'>
                <button className={selectedSearchMethod == 'brand' ? 'active' : ''} onClick={()=>setselectedSearchMethod('brand')}>BRAND</button>
                <button   className={selectedSearchMethod == 'displacement' ? 'active' : ''} onClick={()=>setselectedSearchMethod('displacement')}>DISPLACEMENT</button>
                <button   className={selectedSearchMethod == 'budget' ? 'active' : ''} onClick={()=>setselectedSearchMethod('budget')}>BUDGET</button>
              </div>

              <div  className='brand_container'>
               {
                brandList && brandList.map((brand : Brand , i : number)=>{
                  return (<div className="brand_card">
                     <img  src={'https://d22modxfw04m0o.cloudfront.net/' + brand.logo_url} />
                    {/* <button>{brand.brand_name}</button> */}
                    <p>{brand.brand_name}</p>
                  </div>)
                })
               }

              </div>
              

            </div>
          </div>
        </div>
      </section>
    </>

  );
}

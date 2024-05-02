'use client'
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

type Motorcycle = {
    _id: string;
    motorcycle_name: string;
  };

export default function HomeSearch(){

    const [search, setSearch] = useState<string>("")
    const [searchResult, setSearchResult] = useState<Motorcycle[]>([])
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
    const [renderNavbarOne, setrenderNavbarOne] = useState(false);
  
  
  
    const [selectedSearchMethod , setselectedSearchMethod] = useState('brand')
    // const [brandList , setBrandList] = useState<Brand[]>([])
  
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
    return (

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

    )
}
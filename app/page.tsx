"use client"
import Image from "next/image";
import "./page.css";
import { useState } from "react";
import axios from "axios";

type Motorcycle = {
  _id: string;
  motorcycle_name: string;
};

export default function Home() {
  const [search, setSearch] = useState<string>("")
  const [searchResult, setSearchResult] = useState<Motorcycle[]>([])
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const seachHandler = async (event: any) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    let timer = setTimeout(async () => {
      try {
       let motorcycledata =  await axios.get(`http://localhost:5000/api/v1/user/motorcycle/search-list?search=${searchTerm}`)
       setSearchResult(motorcycledata.data.data)
      } catch (err) {
        console.error(err);
      }
    }, 400)

    setDebounceTimer(timer)
  }
  return (
    <>
      <section className="search_section">
        <div className="search_container">
          <label className='heading_search'>FIND YOUR DREAM BIKE</label>
          <div className='search_wrapper'>
            {!search && <span className='search_placeholder'>Search</span>}
            <input type="text" placeholder="" onChange={(e) => seachHandler(e)} />
            <img src="./magnifying-glass-solid.svg" />
          </div>
          {<div className='search_result_container' style={{ height: searchResult.length == 0  ? '0' : searchResult.length * 50  + 'px' }}>
             <ul>
            {
             searchResult.length != 0  &&  searchResult.map((item :  Motorcycle, i : number)=>{
                return (
                  <li key={i}>{item.motorcycle_name}</li>
                )
              })
            }
             </ul>
          </div>}
        </div>
      </section>
    </>

  );
}

import { useState } from "react";
import "./navbarTwo.css"
import axios from "axios";
import Link from "next/link";
import { MagnifyingGlass } from "react-loader-spinner";


type Motorcycle = {
    _id: string;
    motorcycle_name: string;
  };

export default function NavbarTwo() {

    const [search, setSearch] = useState<string>("")
    const [searchResult, setSearchResult] = useState<Motorcycle[]>([])
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
    const [serchFinished , setserchFinished] = useState(false)

    const seachHandler = async (event: any) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);
        setserchFinished(false)
    
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
    
        let timer = setTimeout(async () => {
          try {
           let motorcycledata =  await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}api/v1/user/motorcycle/search-list?search=${searchTerm}`)
           setSearchResult(motorcycledata.data.data)
           setserchFinished(true)
          } catch (err) {
            console.error(err);
          }
        }, 400)
    
        setDebounceTimer(timer)
      }
    return (
        <nav className="nav2">
            <div className="nav2_inner">
                <img className="logo" src="/logo3.png" />
                <div className="Search_container">
                    <div className="login_btn_container">
                        <img src="/login.png" />
                        <span>Login</span>
                    </div>
                    <div className="login_btn_container">
                        <img src="/heart.png" />
                        <span>Wistlist</span>
                    </div>
                    <div className="search_container_inner">
                    <input placeholder="Search"  onChange={(e) => seachHandler(e)} />
                    { search && <div className="search_list_container">
                   {serchFinished &&  searchResult.length != 0 ?   <ul>
                        {
                        searchResult.length != 0  &&  searchResult.map((item :  Motorcycle, i : number)=>{
                            return (
                            <li key={i}><Link href={`/motorcycle/${item._id}`}>{item.motorcycle_name}</Link></li>
                            )
                        })
                        } 
                        </ul> : serchFinished &&  searchResult.length == 0 ? <div>no data found</div > :
                        <div className='search_gif_container'>
                      <MagnifyingGlass
                        visible={true}
                        height="50"
                        width="50"
                        ariaLabel="magnifying-glass-loading"
                        wrapperStyle={{}}
                        wrapperClass="magnifying-glass-wrapper"
                        glassColor="#c0efff"
                        color="#757575"
                        /> 
                        </div>
                        } 
                    </div>}
                    </div>
                </div>
            </div>
        </nav>
    )
}
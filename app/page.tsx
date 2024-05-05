import "./page.css";
import axios from "axios";
import NavbarTwo from "./components/navbar2/navbarTwo";
import HomeSearch from "./components/home/homeSearch/homeSearch";
import SearchBy from "./components/home/searchBy/searchBy";



export default async function Home() {


  let data = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}api/v1/user/brand/get-all-brand`);
  let brandList = data.data
  console.log(data)

  return (
    <>
      <section id="firstSection">
        <div className="search_section">
          <HomeSearch />
        </div>
      </section>

      <section>
        <div className='body_outer'>
          <div className='body_inner'>
            <SearchBy brandList={brandList}/>
          </div>
        </div>
      </section>
    </>

  );
}

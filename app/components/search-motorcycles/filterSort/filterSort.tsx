'use client'

import { useState } from 'react';
import './filterSort.css';
import useClickOuter from '../../../hooks/useClickOuter'
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function FilterSort(){
    const [sortOpen , setSortOpen] = useState(false);

    const {dropdownRef , buttonRef}  = useClickOuter(dropdownClose);

    const pathname = usePathname()

    const searchParams = useSearchParams()


    console.log(searchParams.get("sort"));
    
    

    function dropdownClose(){
        setSortOpen(false)
    }
    return (
        <div className='filterSort_container'>
            <div></div>

            <div className='sort_wrapper'>
            <button ref={buttonRef} onClick={()=>setSortOpen(true)} className='Sort_btn'>Sort  <img src='/sort.png'/></button>
            {sortOpen && <div ref={dropdownRef} className='sort_dropdown'>
            <ul>
                <li onClick={dropdownClose}  className={` ${!searchParams.get("sort") ? 'active' : ''}`}><Link href={{pathname : '/search-motorcycle' , query : {sort : ''}}}>Popularity</Link></li>
                <li  onClick={dropdownClose}   className={` ${searchParams.get("sort") == '1' ? 'active' : ''}`}><Link href={{pathname : '/search-motorcycle' , query : {sort : '1'}}}>Price low to high</Link></li>
                <li  onClick={dropdownClose}   className={` ${searchParams.get("sort") == '-1' ? 'active' : ''}`}><Link href={{pathname : '/search-motorcycle' , query : {sort : '-1'}}}>Price high to low</Link></li>
            </ul>
            </div>}
            </div>
        
        </div>
    )
}
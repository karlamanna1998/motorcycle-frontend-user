// components/Test.tsx

import Link from 'next/link';
import React from 'react';

const Tab1: React.FC = () => <div id="tab1" className="tab-content">Tab 1 Content</div>;
const Tab2: React.FC = () => <div id="tab2" className="tab-content">Tab 2 Content</div>;
const Tab3: React.FC = () => <div id="tab3" className="tab-content">Tab 3 Content</div>;

const Test = ({
    searchParams: { q = 'all' },
  }: {
    searchParams: {
      q: string
    }
  }) => {

    console.log(q);
    

  return (
    <div>
    <nav className="tabs-nav">
      <ul>
        <li>
          <Link href="#tab1">
            Tab 1
          </Link>
        </li>
        <li>
          <Link href="#tab2">
            Tab 2
          </Link>
        </li>
        <li>
          <Link href="#tab3">
        Tab 3
          </Link>
        </li>
      </ul>
    </nav>
    <div className="tab-container">
      <Tab1 />
      <Tab2 />
      <Tab3 />
    </div>
  </div>
  );
};

export default Test;

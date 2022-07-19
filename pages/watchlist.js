
import Layout from '../components/Layout';
import Link from 'next/link';
import { Card } from 'semantic-ui-react';
import watchlist from './api/watchlist';


const Watchlist = ({ Watchlists }) => {
return(
  <div>
    {Watchlists.map(watchlist => {
    return(
      <div key={watchlist._id}>
        <div>
          <div>{watchlist.title}</div>
        </div>
      </div>
    )
  })}
  </div>
)

  
}


Watchlist.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/watchlist');
  const { data } = await res.json();
  return { Watchlists: data } 
  }
  export default Watchlist;

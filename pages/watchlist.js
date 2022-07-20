
import Layout from '../components/Layout';
import Link from 'next/link';
import watchlist from './api/watchlist';

import {
  Container,
  UnorderedList,
  ListItem,  
  Heading,
  Button,
  Image,
  Text,
  Center
} from '@chakra-ui/react';


export default function Watchlist ({ Watchlists }) { 
return(
  <Layout>
    <Center class="pageTitle" as="h1">Your Watchlist, Master</Center>
  <Container>
  <UnorderedList>
    
    {Watchlists.map(watchlist => {
    return(
      <ListItem key={watchlist._id}>
              <Link href={`/movies/${watchlist.id}`}
              passHref
              >            
              <Button
              as="a"
              variant="link"

              >
              <Image src={`https://image.tmdb.org/t/p/w500/${watchlist.posterPath}`}
              alt = "Movie poster"

              />
              <Text as="h4">{watchlist.title}
              </Text>


              </Button>
              </Link>




      </ListItem>
    )
  })}
  </UnorderedList>
  </Container>
  </Layout>
)




  
}



Watchlist.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/watchlist');
  const { data } = await res.json();
  return { Watchlists: data } 
  }
  



  

  

import Layout from '../components/Layout';
import Link from 'next/link';
import history from './api/history';

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


export default function History ({ Histories }) { 
  
return(
  <Layout>
    <h1 class="pageTitle" as="h1">Your History, Master</h1>
  <Container>
  <UnorderedList>
    
    {Histories.map(history => {
    return(
      <ListItem key={history._id}>
              <Link href={`/movies/${history.id}`}
              passHref
              >            
              <Button
              as="a"
              variant="link"

              >
              <Image src={`https://image.tmdb.org/t/p/w500/${history.posterPath}`}
              alt = "Movie poster"

              />
              <Text as="h4">{history.title}
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



History.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/history');
  const { data } = await res.json();
  return { Histories: data } 
  }
  



  

  
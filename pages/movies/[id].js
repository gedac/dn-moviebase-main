import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import useSWR from 'swr';
import { buildImageUrl } from '../../utils/api';
import {
  Badge,
  Box,
  Center,
  CircularProgress,
  Container,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,

} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import WatchlistButton from '../../components/WatchlistButton';

import useFetch from "../../utils/useFetch";

import { fetcher } from "../../utils/useFetch";
import HistoryButton from '../../components/HistoryButton';

function Credits(props) {
  const { movieId } = props;
  const BASE_URL = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=53876badebbba586618edeba5a132260`;
  const { data: credits, loading, error } = useFetch(BASE_URL, { credits: [] });
  return (
    <div className="credits">
      <h1 id="headCredits">Credits</h1>
      <div id="creditsList">
      {loading ? (
        "Loading"
      ) : credits && credits.cast ? (
        credits.cast.map((castMember) => <p>{castMember.name}</p>)
      ) : (
        <div>{"Error fetching credits"}</div>
      )}
      {error ? error : null}
    </div>
    </div>
  );
}


const MovieContent = () => {
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/movies/${id}`);
  

  if (error) {
    return (
      <Text color="red">
        Error fetching movie with ID {id}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (data.success === false) {
    return <Text color="red">{data.status_message}</Text>;
  }
  return (
    
    

    
    <Stack direction={['column', 'row']} spacing={4}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Box minW="300px" pos="relative">
        <HStack pos="absolute" zIndex={1} top={2} right={2}>
          <WatchlistButton />
        </HStack>
        <Image
          src={buildImageUrl(data.poster_path, 'w300')}
          alt="Movie poster"
          layout="responsive"
          width="300"
          height="450"
          objectFit="contain"
          unoptimized
        />
      </Box>
      <Stack>
        <HStack justify="space-between">
          <Heading as="h2">{data.title}</Heading>
          <Box>
            <Tag colorScheme="purple" variant="solid">
              {data.release_date}
            </Tag>
          </Box>
        </HStack>
        <Box>{data.tagline}</Box>

        <Stack direction="row">
          {data.genres?.map((genre) => (
            <Badge key={genre.id} colorScheme="purple" variant="outline">
              {genre.name}
            </Badge>
          ))}
        </Stack>
        <Box>{data.overview}</Box>
        <div id="rating">Rated {data.vote_average} out of 10</div>
        <Credits movieId={id} />   
        </Stack>
    </Stack>

    
  );
  

  

};

export default function Movie() {
  return (
    <Layout>
      <Container h="full">
        <MovieContent />
      </Container>
    </Layout>
  );
}



 
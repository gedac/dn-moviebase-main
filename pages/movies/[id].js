import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import useSWR from "swr";
import { buildImageUrl } from "../../utils/api";
import {
  Badge,
  Box,
  Center,
  CircularProgress,
  Container,
  Heading,
  HStack,
  ListItem,
  Stack,
  Tag,
  Text,
  UnorderedList,
  Link,
  VStack,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import HistoryButton from "../../components/HistoryButton";
import WatchlistButton from "../../components/WatchlistButton";

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
  return (
    <>
      <Stack direction={["column", "row"]} spacing={4}>
        <Head>
          <title>{data.movie.title}</title>
        </Head>
        <Box minW="300px" pos="relative">
        <HStack pos="absolute" zIndex={1} top={2} right={2}>
        <WatchlistButton />
            <HistoryButton />
        </HStack>
          <Image
            src={buildImageUrl(data.movie.poster_path, "w300")}
            alt="Movie poster"
            layout="responsive"
            width="300"
            height="450"
            objectFit="contain"
            unoptimized            
          />
          
        </Box>
        <Stack marginBottom="0">
          
          <VStack align="flex-start">
            <Heading as="h2" mt="1em">
              {data.movie.title}
            </Heading>
            <Tag>
              Released on: {data.movie.release_date}
            </Tag>            
          </VStack>

          <Stack direction="row" pt="1em">
            {data.movie.genres?.map((genre) => (
              <Badge key={genre.id} colorScheme="purple" variant="outline">
                {genre.name}
              </Badge>
            ))}
          </Stack>
          <Box pt="2em">{data.movie.overview || data.movie.plot}</Box>
          
        </Stack>
      </Stack>
      <Heading
            as="h3"
            textAlign={["center", "center"]}
            mb="2em"
            mt="1.3em"
          >
            Cast
          </Heading>
      <Box>
        <UnorderedList id="castList" stylePosition="inside">
          
          <Stack
            display={"flex"}
            flexWrap={"wrap"}
            direction={["column", "row"]}
            justify-content={["center", "flex-start"]}
            alignItems={["center", "flex-start"]}
          >
            {data.castToDisplay.map((actor) => (
              <ListItem id="castListMember" key={actor.id} listStyleType={"none"}>
                <Box
                  minW="200px"
                  minHeight={"250"}
                  mb="1em"
                  mt="1em"
                  display={"flex"}
                  justify={["center", "flex-start"]}
                  alignItems={["center", "flex-start"]}
                 
                >
                  <Image
                    id="actorImage"
                    src={buildImageUrl(actor.profile_path, "w200")}
                    alt="Actor picture"
                    layout="intrinsic"
                    width="200"
                    height="250"
                    objectFit="cover"
                    unoptimized
                  />
                </Box>                
                  <Text maxW="200px" textAlign="center" fontSize="1em">{actor.name}</Text>                             
                  <Text maxW="200px" textAlign="center" fontSize="1em">as {actor.character}</Text>
                
              </ListItem>
            ))}
          </Stack>
        </UnorderedList>
      </Box>
    </>
  );
};

export default function Movie() {
  return (
    <Layout>
      <Container h="full" mb="3em">
        <MovieContent />
      </Container>
    </Layout>
  );
}
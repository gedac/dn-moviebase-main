import useSWR from "swr";
import { 
  Container,
  Text,
  Progress,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import MovieResult from "../components/MovieResult";



export default function Homepage() {
  const { data, error } = useSWR("/api/home");

  if (error) {
    return (
      <Text color="red">
        Error fetching recommended movies for you: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }

  return (
    <Layout title="Moviebase">
      <Container>
          
      <h1 class="pageTitle" as="h1">Recomandations based on your history</h1>
          <ul>
            {data.recMovies?.results?.map((movie) => (
              <MovieResult key={"movie.id"} movie={movie} />
            ))}
          </ul>
        
          <h1 class="pageTitle" as="h1">Best rated movies</h1>
          <ul>
          
            {data.topRated?.results?.map((movie) => (
              <MovieResult key={"movie.id"} movie={movie} />
            ))}
            </ul>
        
        
            <h1 class="pageTitle" as="h1">Upcoming movies</h1>
            <ul>
            {data.upcomingMovies?.results?.map((movie) => (
              <MovieResult key={"movie.id"} movie={movie} />
            ))}
            </ul>
            <h1 class="pageTitle" as="h1">Popular titles</h1>
            <ul>
            {data.popularMovies?.results?.map((movie) => (
              <MovieResult key={"movie.id"} movie={movie} />
            ))}
          </ul>
        
        </Container>
    </Layout>
  );
}
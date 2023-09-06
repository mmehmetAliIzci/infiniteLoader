import { useRef } from "react";
import { fetchCharacters } from "../../api/fetchCharacters";
import { Character } from "../../api/models";
import { CharacterItem } from "../atoms/CharacterItem";
import InfiniteLoader from "../molecules/InfiniteLoader";

const RickAndMortyList = () => {
  // change this to 40 to simulate has more
  const page = useRef(1);
  const fetchData = async (): Promise<Character[]> => {
    try {
      const apiData = await fetchCharacters(page.current);
      if (apiData && apiData.results) {
        page.current += 1;
        return apiData.results;
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch Rick and Morty data", error);
      return [];
    }
  };

  return (
    <InfiniteLoader
      fetchNextPage={fetchData}
      renderItem={(item) => <CharacterItem {...item} />}
    />
  );
};

export default RickAndMortyList;

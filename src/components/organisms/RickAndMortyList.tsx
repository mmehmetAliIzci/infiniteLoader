import { memo } from "react";
import { fetchCharacters } from "../../api/fetchCharacters";
import { Character } from "../../api/models";
import { CharacterItem } from "../atoms/CharacterItem";
import InfiniteLoader from "../molecules/InfiniteLoader";

const RickAndMortyList = () => {
  const fetchData = async (page: number): Promise<Character[]> => {
    try {
      const apiData = await fetchCharacters(page);
      if (apiData && apiData.results) {
        return apiData.results;
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch Rick and Morty data", error);
      throw error;
    }
  };

  const MemoizedCharacterItem = memo(CharacterItem);

  return <InfiniteLoader fetchData={fetchData} renderItem={(item) => <MemoizedCharacterItem {...item} />} />;
};

export default RickAndMortyList;

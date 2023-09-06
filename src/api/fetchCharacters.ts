import { ApiResponse } from "./models";

export const fetchCharacters = async (page: number): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const apiData: ApiResponse = await response.json();
    return apiData;
  } catch (e: any) {
    throw new Error(`Error fetching data: ${e.message}`);
  }
};

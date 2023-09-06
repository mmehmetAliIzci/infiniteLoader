import { Character } from "../../api/models";

export const CharacterItem: React.FC<Character> = ({
  image,
  name,
  species,
}) => {
  return (
    <div>
      <img className="profile-photo" src={image} alt="Carlie Anglemire" />
      <h3>{name}</h3>
      <p>{species}</p>
    </div>
  );
};

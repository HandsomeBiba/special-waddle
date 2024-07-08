import { StringFilter } from "../../util/StringFilter";
import { IntNullableFilter } from "../../util/IntNullableFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type FilmWhereInput = {
  id?: StringFilter;
  numberOfParts?: IntNullableFilter;
  totalTime?: IntNullableFilter;
  title?: StringNullableFilter;
  archiveNumber?: StringNullableFilter;
  releaseYear?: IntNullableFilter;
  studio?: StringNullableFilter;
  screenwriter?: StringNullableFilter;
  sound?: StringNullableFilter;
  color?: StringNullableFilter;
  format?: StringNullableFilter;
  carrier?: StringNullableFilter;
  director?: StringNullableFilter;
  cinematographer?: StringNullableFilter;
  otherParticipants?: StringNullableFilter;
  annotation?: StringNullableFilter;
};

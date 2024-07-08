import { SortOrder } from "../../util/SortOrder";

export type FilmOrderByInput = {
  id?: SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
  numberOfParts?: SortOrder;
  totalTime?: SortOrder;
  title?: SortOrder;
  archiveNumber?: SortOrder;
  releaseYear?: SortOrder;
  studio?: SortOrder;
  screenwriter?: SortOrder;
  sound?: SortOrder;
  color?: SortOrder;
  format?: SortOrder;
  carrier?: SortOrder;
  director?: SortOrder;
  cinematographer?: SortOrder;
  otherParticipants?: SortOrder;
  annotation?: SortOrder;
};

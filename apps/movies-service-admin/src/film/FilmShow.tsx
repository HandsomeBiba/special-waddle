import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
} from "react-admin";

export const FilmShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="ID" source="id" />
        <DateField source="createdAt" label="Created At" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="numberOfParts" source="numberOfParts" />
        <TextField label="totalTime" source="totalTime" />
        <TextField label="title" source="title" />
        <TextField label="archiveNumber" source="archiveNumber" />
        <TextField label="releaseYear" source="releaseYear" />
        <TextField label="studio" source="studio" />
        <TextField label="screenwriter" source="screenwriter" />
        <TextField label="sound" source="sound" />
        <TextField label="color" source="color" />
        <TextField label="format" source="format" />
        <TextField label="carrier" source="carrier" />
        <TextField label="director" source="director" />
        <TextField label="cinematographer" source="cinematographer" />
        <TextField label="otherParticipants" source="otherParticipants" />
        <TextField label="annotation" source="annotation" />
      </SimpleShowLayout>
    </Show>
  );
};

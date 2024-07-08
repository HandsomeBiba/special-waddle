import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  NumberInput,
  TextInput,
} from "react-admin";

export const FilmEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <NumberInput step={1} label="numberOfParts" source="numberOfParts" />
        <NumberInput step={1} label="totalTime" source="totalTime" />
        <TextInput label="title" source="title" />
        <TextInput label="archiveNumber" source="archiveNumber" />
        <NumberInput step={1} label="releaseYear" source="releaseYear" />
        <TextInput label="studio" source="studio" />
        <TextInput label="screenwriter" source="screenwriter" />
        <TextInput label="sound" source="sound" />
        <TextInput label="color" source="color" />
        <TextInput label="format" source="format" />
        <TextInput label="carrier" source="carrier" />
        <TextInput label="director" source="director" />
        <TextInput label="cinematographer" source="cinematographer" />
        <TextInput
          label="otherParticipants"
          multiline
          source="otherParticipants"
        />
        <TextInput label="annotation" multiline source="annotation" />
      </SimpleForm>
    </Edit>
  );
};

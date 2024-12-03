import { ArgsType, Field } from "@nestjs/graphql";
import { UserWhereUniqueInput } from "../user/base/UserWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

@ArgsType()
class AssignRoleInput {
    @Field(() => UserWhereUniqueInput)
    @ApiProperty({
        required: true,
        type: () => UserWhereUniqueInput
    })
    @Type(() => UserWhereUniqueInput)
    userId!: UserWhereUniqueInput;

    @Field(() => UserWhereUniqueInput)
    @ApiProperty({
        required: true,
        type: () => UserWhereUniqueInput
    })
    @Type(() => UserWhereUniqueInput)
    roleId!: UserWhereUniqueInput;
}

export { AssignRoleInput as AssignRoleInput };
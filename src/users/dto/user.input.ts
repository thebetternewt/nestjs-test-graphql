import { Length, MaxLength } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class UserInput {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  @MaxLength(50)
  firstName: string;

  @Field({ nullable: true })
  @MaxLength(50)
  middleName: string;

  @Field({ nullable: true })
  @MaxLength(50)
  lastName: string;

  @Field({ nullable: true })
  @Length(3, 255)
  email: string;

  @Field({ nullable: true })
  @Length(3, 255)
  password: string;

  @Field({ nullable: true })
  @Length(3, 255)
  confirmPassword: string;
}

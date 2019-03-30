import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UserSignInInput {
  @Field()
  @Length(3, 255)
  email: string;

  @Field()
  @Length(3, 255)
  password: string;
}

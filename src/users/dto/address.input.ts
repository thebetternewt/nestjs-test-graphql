import { Field, InputType } from 'type-graphql';

@InputType()
export class AddressInput {
  @Field()
  street1: string;

  @Field({ nullable: true })
  street2: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zipcode: string;
}

import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Address {
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

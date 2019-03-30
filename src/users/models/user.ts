import { GraphQLDate } from 'graphql-iso-date';
import { Field, ID, ObjectType } from 'type-graphql';
import { Address } from './address';

@ObjectType()
export class User {
  @Field(type => ID)
  id: string;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  middleName: string;

  @Field()
  lastName: string;

  @Field()
  fullName: string;

  @Field(type => GraphQLDate)
  birthDate: Date;

  @Field()
  phone: string;

  @Field(type => Address)
  address: Address;

  @Field()
  email: string;
}

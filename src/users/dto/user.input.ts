import { Length, MaxLength } from 'class-validator';
import { GraphQLDate } from 'graphql-iso-date';
import { Field, ID, InputType } from 'type-graphql';
import { AddressInput } from './address.input';

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

  @Field(type => GraphQLDate, { nullable: true })
  birthDate: GraphQLDate;

  @Field({ nullable: true })
  phone: string;

  @Field(type => AddressInput, { nullable: true })
  address: AddressInput;

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

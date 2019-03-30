import { MaxLength } from 'class-validator';
import { GraphQLDateTime } from 'graphql-iso-date';
import { Field, InputType } from 'type-graphql';
import { NeedType } from '../models/need';
import { LocationInput } from './location.input';

@InputType()
export class NewNeedInput {
  @Field()
  @MaxLength(100)
  title: string;

  @Field({ nullable: true })
  volunteer: string;

  @Field(type => LocationInput)
  location: LocationInput;

  @Field(type => GraphQLDateTime)
  date: GraphQLDateTime;

  @Field()
  notes: string;

  @Field(type => NeedType)
  needType: NeedType;
}

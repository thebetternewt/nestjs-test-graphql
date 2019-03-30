import { GraphQLDateTime } from 'graphql-iso-date';
import { User } from 'src/users/models/user';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Location } from './location';

export enum NeedType {
  TRAVEL,
  LAWNCARE,
  CHILDCARE,
  HOME_MAINTENANCE,
}

registerEnumType(NeedType, {
  name: 'NeedType', // this one is mandatory
  description: 'The type of need requested.', // this one is optional
});

@ObjectType()
export class Need {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field(type => User)
  recipient: User;

  @Field(type => User, { nullable: true })
  volunteer: string;

  @Field(type => Location)
  location: Location;

  @Field(type => GraphQLDateTime)
  date: GraphQLDateTime;

  @Field()
  notes: string;

  @Field(type => NeedType)
  needType: NeedType;

  // TODO: Add status on Need object?
}

import { Field, Float, ObjectType } from 'type-graphql';

@ObjectType()
export class Location {
  @Field()
  address: string;

  @Field(type => Float)
  lat: string;

  @Field(type => Float)
  lng: string;
}

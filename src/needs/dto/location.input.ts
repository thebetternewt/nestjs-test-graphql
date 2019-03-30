import { Field, Float, InputType } from 'type-graphql';

@InputType()
export class LocationInput {
  @Field()
  address: string;

  @Field(type => Float)
  lat: number;

  @Field(type => Float)
  lng: number;
}

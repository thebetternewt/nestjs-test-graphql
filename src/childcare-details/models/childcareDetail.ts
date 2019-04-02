import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { NeedType, Need } from 'src/needs/models/need';

export enum ChildcareAge {
  INFANT,
  TODDLER,
  CHILD,
  TEENAGER,
}

registerEnumType(ChildcareAge, {
  name: 'ChildcareAge', // this one is mandatory
  description: 'The age of children needing care.', // this one is optional
});

@ObjectType()
export class ChildcareDetail {
  @Field(type => ID)
  id: string;

  @Field(type => [ChildcareAge])
  age: ChildcareAge[];

  @Field()
  needType: NeedType;

  @Field(type => Need)
  need: Need;
}

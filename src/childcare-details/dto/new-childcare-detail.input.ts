import { Field, InputType, ID } from 'type-graphql';
import { ChildcareAge } from '../models/childcareDetail';

@InputType()
export class NewChildcareDetailInput {
  @Field(type => [ChildcareAge])
  age: ChildcareAge[];

  @Field(type => ID)
  need: string;
}

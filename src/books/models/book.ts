import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Book {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  author: string;
}

import { Max, Min } from 'class-validator';
import { ArgsType, Field, ID, Int } from 'type-graphql';

@ArgsType()
export class BooksArgs {
  @Field(type => Int)
  @Min(0)
  skip: number = 0;

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take: number = 25;

  @Field(type => ID)
  id: string;
}

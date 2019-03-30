import { IsOptional, Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(50)
  firstName: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(50)
  middleName: string;

  @Field()
  @MaxLength(50)
  lastName: string;

  @Field()
  @Length(3, 255)
  email: string;

  @Field()
  @Length(3, 255)
  password: string;

  @Field()
  @Length(3, 255)
  confirmPassword: string;
}

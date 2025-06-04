import { IsString, IsUUID } from 'class-validator';

export class ActorDto {
  @IsString()
  name: string;
}

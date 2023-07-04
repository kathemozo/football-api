import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

const enum errorsMessages {
  NAME_REQUIRED = 'Name is required',
  NAME_STRING = 'Name must be a string',
  NICKNAME_REQUIRED = 'Nickname is required',
  NICKNAME_STRING = 'Nickname must be a string',
  CREATION_YEAR_REQUIRED = 'The year of creation is required',
  STADIUM_REQUIRED = 'Stadium is required',
  STADIUM_STRING = 'Stadium must be a string',
  CITY_REQUIRED = 'City is required',
  CITY_STRING = 'City must be a string',
  COUNTRY_REQUIRED = 'Country is required',
  COUNTRY_STRING = 'Country must be a string',
}
export class CreateTeamDTO {
  @IsString({ message: errorsMessages.NAME_STRING })
  @IsNotEmpty({ message: errorsMessages.NAME_REQUIRED })
  @ApiProperty()
  name: string;

  @IsString({ message: errorsMessages.NICKNAME_STRING })
  @IsNotEmpty({ message: errorsMessages.NICKNAME_REQUIRED })
  @ApiProperty()
  nickName: string;

  @Type(() => Number)
  @IsDefined({ message: errorsMessages.CREATION_YEAR_REQUIRED })
  @ApiProperty()
  creationYear: number;

  @IsString({ message: errorsMessages.NICKNAME_STRING })
  @IsNotEmpty({ message: errorsMessages.NICKNAME_REQUIRED })
  @ApiProperty()
  stadium: string;

  @IsString({ message: errorsMessages.COUNTRY_STRING })
  @IsNotEmpty({ message: errorsMessages.COUNTRY_REQUIRED })
  @ApiProperty()
  country: string;

  @IsString({ message: errorsMessages.CITY_STRING })
  @IsNotEmpty({ message: errorsMessages.CITY_REQUIRED })
  @ApiProperty()
  city: string;
}

/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import { FilmService } from "../film.service";
import { FilmCreateInput } from "./FilmCreateInput";
import { Film } from "./Film";
import { FilmFindManyArgs } from "./FilmFindManyArgs";
import { FilmWhereUniqueInput } from "./FilmWhereUniqueInput";
import { FilmUpdateInput } from "./FilmUpdateInput";
import { FilmWhereInput } from "./FilmWhereInput";

export class FilmControllerBase {
  constructor(protected readonly service: FilmService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Film })
  async createFilm(@common.Body() data: FilmCreateInput): Promise<Film> {
    return await this.service.createFilm({
      data: data,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        numberOfParts: true,
        totalTime: true,
        title: true,
        archiveNumber: true,
        releaseYear: true,
        studio: true,
        screenwriter: true,
        sound: true,
        color: true,
        format: true,
        carrier: true,
        director: true,
        cinematographer: true,
        otherParticipants: true,
        annotation: true,
      },
    });
  }

  @common.Get()
  @swagger.ApiOkResponse({ type: [Film] })
  @ApiNestedQuery(FilmFindManyArgs)
  async films(@common.Req() request: Request): Promise<Film[]> {
    const args = plainToClass(FilmFindManyArgs, request.query);
    return this.service.films({
      ...args,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        numberOfParts: true,
        totalTime: true,
        title: true,
        archiveNumber: true,
        releaseYear: true,
        studio: true,
        screenwriter: true,
        sound: true,
        color: true,
        format: true,
        carrier: true,
        director: true,
        cinematographer: true,
        otherParticipants: true,
        annotation: true,
      },
    });
  }

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Film })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async film(
    @common.Param() params: FilmWhereUniqueInput
  ): Promise<Film | null> {
    const result = await this.service.film({
      where: params,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        numberOfParts: true,
        totalTime: true,
        title: true,
        archiveNumber: true,
        releaseYear: true,
        studio: true,
        screenwriter: true,
        sound: true,
        color: true,
        format: true,
        carrier: true,
        director: true,
        cinematographer: true,
        otherParticipants: true,
        annotation: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Film })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async updateFilm(
    @common.Param() params: FilmWhereUniqueInput,
    @common.Body() data: FilmUpdateInput
  ): Promise<Film | null> {
    try {
      return await this.service.updateFilm({
        where: params,
        data: data,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          numberOfParts: true,
          totalTime: true,
          title: true,
          archiveNumber: true,
          releaseYear: true,
          studio: true,
          screenwriter: true,
          sound: true,
          color: true,
          format: true,
          carrier: true,
          director: true,
          cinematographer: true,
          otherParticipants: true,
          annotation: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Film })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async deleteFilm(
    @common.Param() params: FilmWhereUniqueInput
  ): Promise<Film | null> {
    try {
      return await this.service.deleteFilm({
        where: params,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          numberOfParts: true,
          totalTime: true,
          title: true,
          archiveNumber: true,
          releaseYear: true,
          studio: true,
          screenwriter: true,
          sound: true,
          color: true,
          format: true,
          carrier: true,
          director: true,
          cinematographer: true,
          otherParticipants: true,
          annotation: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Get("/search/films")
  @swagger.ApiOkResponse({
    type: FilmFindManyArgs,
  })
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async SearchFilms(
    @common.Body()
    body: FilmWhereInput
  ): Promise<FilmFindManyArgs[]> {
    return this.service.SearchFilms(body);
  }
}

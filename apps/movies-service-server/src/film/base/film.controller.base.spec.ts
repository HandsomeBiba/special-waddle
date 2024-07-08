import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { FilmController } from "../film.controller";
import { FilmService } from "../film.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  numberOfParts: 42,
  totalTime: 42,
  title: "exampleTitle",
  archiveNumber: "exampleArchiveNumber",
  releaseYear: 42,
  studio: "exampleStudio",
  screenwriter: "exampleScreenwriter",
  sound: "exampleSound",
  color: "exampleColor",
  format: "exampleFormat",
  carrier: "exampleCarrier",
  director: "exampleDirector",
  cinematographer: "exampleCinematographer",
  otherParticipants: "exampleOtherParticipants",
  annotation: "exampleAnnotation",
};
const CREATE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  numberOfParts: 42,
  totalTime: 42,
  title: "exampleTitle",
  archiveNumber: "exampleArchiveNumber",
  releaseYear: 42,
  studio: "exampleStudio",
  screenwriter: "exampleScreenwriter",
  sound: "exampleSound",
  color: "exampleColor",
  format: "exampleFormat",
  carrier: "exampleCarrier",
  director: "exampleDirector",
  cinematographer: "exampleCinematographer",
  otherParticipants: "exampleOtherParticipants",
  annotation: "exampleAnnotation",
};
const FIND_MANY_RESULT = [
  {
    id: "exampleId",
    createdAt: new Date(),
    updatedAt: new Date(),
    numberOfParts: 42,
    totalTime: 42,
    title: "exampleTitle",
    archiveNumber: "exampleArchiveNumber",
    releaseYear: 42,
    studio: "exampleStudio",
    screenwriter: "exampleScreenwriter",
    sound: "exampleSound",
    color: "exampleColor",
    format: "exampleFormat",
    carrier: "exampleCarrier",
    director: "exampleDirector",
    cinematographer: "exampleCinematographer",
    otherParticipants: "exampleOtherParticipants",
    annotation: "exampleAnnotation",
  },
];
const FIND_ONE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  numberOfParts: 42,
  totalTime: 42,
  title: "exampleTitle",
  archiveNumber: "exampleArchiveNumber",
  releaseYear: 42,
  studio: "exampleStudio",
  screenwriter: "exampleScreenwriter",
  sound: "exampleSound",
  color: "exampleColor",
  format: "exampleFormat",
  carrier: "exampleCarrier",
  director: "exampleDirector",
  cinematographer: "exampleCinematographer",
  otherParticipants: "exampleOtherParticipants",
  annotation: "exampleAnnotation",
};

const service = {
  createFilm() {
    return CREATE_RESULT;
  },
  films: () => FIND_MANY_RESULT,
  film: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("Film", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: FilmService,
          useValue: service,
        },
      ],
      controllers: [FilmController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /films", async () => {
    await request(app.getHttpServer())
      .post("/films")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /films", async () => {
    await request(app.getHttpServer())
      .get("/films")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /films/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/films"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /films/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/films"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /films existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/films")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/films")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

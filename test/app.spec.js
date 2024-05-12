import app from "../src/app.js";
import request from "supertest";

describe(`GET /tasks`, () => {
  test(`Should respound with a 200 status code`, async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.statusCode).toBe(200);
  });

  test(`Should respound with a 200 status code`, async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe(`POST /tasks`, () => {
  describe(`Given title and description`, () => {
    test(`Should respond with a 200 status code`, async () => {
      const response = await request(app).post("/tasks").send();
      expect(response.statusCode).toBe(200);
    });

    test(`Should have a Content-type in aplication/json in header`, async () => {
      const response = await request(app).post("/tasks").send();
      expect(response.headers["content-type"]).toEqual(
        `application/json; charset=utf-8`
      );
    });

    test(`Should respond with a tasks ID`, async () => {
      const response = await request(app).post("/tasks/id").send({
        title: "App Tasks",
        example: "app tasks,course demo, Fazt code",
      });
      expect(response.body.id).toBeDeFined;
    });
  });

  describe(`When title and descriptcion is missing`, () => {
    test(`Should respond with 400 status code`, async () => {
      const fields = [
        {},
        { title: "App tasks" },
        { description: "app tasks example" },
      ];

      for (const body of fields) {
        const respond = await request(app).post("/tasks/id").send(body);
        expect(respond.statusCode).toBe(400);
      }
    });
  });
});

//

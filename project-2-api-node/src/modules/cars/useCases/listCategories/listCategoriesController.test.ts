import request from "supertest";

import { app } from "../../../../shared/infra/http/app";
import { prisma } from "../../../../shared/infra/prisma/prisma";

describe("List Category Controller", () => {
  let token: string;
  beforeAll(async () => {
    const { body } = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin123",
    });
    token = body.token;
    await request(app)
      .post("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: "new category for list 1",
        description: "descrição category super test",
      });
    await request(app)
      .post("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: "new category for list 2",
        description: "descrição category super test",
      });
  });
  afterAll(async () => {
    await prisma.category.deleteMany({});
    await prisma.$disconnect();
  });
  it("should be able to list categories", async () => {
    const resp = await request(app)
      .get("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(resp.status).toBe(200);
    expect(resp.body.length).toBe(2);
    expect(resp.body[0]).toHaveProperty("id");
    expect(resp.body[0].name).toStrictEqual("new category for list 1");
    expect(resp.body[1]).toHaveProperty("id");
    expect(resp.body[1].description).toStrictEqual(
      "descrição category super test"
    );
  });
});

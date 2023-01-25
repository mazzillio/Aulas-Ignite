import request from "supertest";

import { app } from "../../../../shared/infra/http/app";
import { prisma } from "../../../../shared/infra/prisma/prisma";

describe("Create Category Controller", () => {
  let token: string;
  beforeAll(async () => {
    const { body } = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin123",
    });
    token = body.token;
  });
  afterAll(async () => {
    await prisma.category.deleteMany({});
  });
  it("should be able to create a new category", async () => {
    const resp = await request(app)
      .post("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: "new category for supertest",
        description: "descrição category super test",
      });
    expect(resp.status).toBe(201);
  });
  it("should not be able to create a new category with exists name", async () => {
    const resp = await request(app)
      .post("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: "new category for supertest",
        description: "descrição category super test",
      });
    expect(resp.status).toBe(400);
  });
});

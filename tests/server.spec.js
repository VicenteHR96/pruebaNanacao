const request = require("supertest");
const server = require("../index");

describe("Operando CRUD de cafés", () => {
  it("Obteniendo un arreglo con al menos 1 objeto correctamente", async () => {
    const response = await request(server).get("/cafes").send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Eliminar café con ID inexistente", async () => {
    const jwt = "token";
    const deleteId = 123123;
    const response = await request(server)
      .delete(`/cafes/${deleteId}`)
      .set("Authorization", jwt)
      .send();

    expect(response.statusCode).toBe(404);
  });

  it("Agregar un café correctamente (201)", async () => {
    const id = 5;
    const cafe = { id, nombre: "Frappuccino" };
    const response = await request(server).post("/cafes/").send(cafe);

    expect(response.statusCode).toBe(201);
  });

  it("Actualizar ID incongruente", async () => {
    const updateId = 2;
    const id = 1;
    const cafe = { id, nombre: "Cortado" };
    const response = await request(server).put(`/cafes/${updateId}`).send(cafe);

    expect(response.statusCode).toBe(400);
  });
});

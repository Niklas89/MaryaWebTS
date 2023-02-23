import axios from "../api/axios";
import "@testing-library/jest-dom/extend-expect";
import { ICategory } from "../interfaces/ICategory";

//test unitaire sur les catégories
describe("Get Caterogy from API", () => {
  const GETCATEGORY_URL = "/service/category";
  var statusCode: number;
  var dataResponse: ICategory;

  //test sur le code statut de la requête
  it("should return a code status 200", async () => {
    await axios({
      method: "get",
      url: GETCATEGORY_URL,
    }).then((res) => {
      statusCode = res.status;
      dataResponse = res.data;
    });
    expect(statusCode).toBe(200);
  });

  //test sur le corps de la requête
  it("should return an array with six categories", async () => {
    await axios({
      method: "get",
      url: GETCATEGORY_URL,
    }).then((res) => {
      statusCode = res.status;
      dataResponse = res.data;
    });
    expect(dataResponse).toStrictEqual([
      {
        id: 1,
        name: "Coiffure",
        createdAt: "2022-09-15T07:47:21.000Z",
        updatedAt: "2022-09-15T07:47:21.000Z",
      },
      {
        id: 2,
        name: "Bricolage",
        createdAt: "2022-09-15T07:47:21.000Z",
        updatedAt: "2022-09-15T07:47:21.000Z",
      },
      {
        id: 3,
        name: "Jardinage",
        createdAt: "2022-09-15T07:47:21.000Z",
        updatedAt: "2022-09-15T07:47:21.000Z",
      },
      {
        id: 4,
        name: "Ménage",
        createdAt: "2022-09-15T07:47:21.000Z",
        updatedAt: "2022-09-15T07:47:21.000Z",
      },
      {
        id: 5,
        name: "Beauté",
        createdAt: "2022-09-15T07:47:21.000Z",
        updatedAt: "2022-09-15T07:47:21.000Z",
      },
      {
        id: 6,
        name: "Babysitting",
        createdAt: "2022-09-15T07:47:21.000Z",
        updatedAt: "2022-09-15T07:47:21.000Z",
      },
    ]);
  });
});

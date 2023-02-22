import axios from "../api/axios";

describe("Get Caterogy and display them", () => {
  it("should return a code status 200", async () => {
    const GETCATEGORY_URL = "/service/category";
    expect(
      await axios({
        method: "get",
        url: GETCATEGORY_URL,
      }).then((res) => res.status)
    ).toBe(200);

    it("shoud return componants with title", () => {
      
    })
  });
});

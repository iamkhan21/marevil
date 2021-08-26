import { formatDateToHR } from "./formatters";

describe("Formatters", function () {
  describe("formatDateToHR", function () {
    it("should format date from date", function () {
      expect(formatDateToHR(new Date("2021-08-21 15:20"))).toBe(
        "August 21, 15:20"
      );
      expect(formatDateToHR(new Date("2020-08-02 15:32"))).toBe(
        "August 2, 2020, 15:32"
      );
    });
    it("should format date from number", function () {
      expect(formatDateToHR(new Date("2021-08-21 15:20").getTime())).toBe(
        "August 21, 15:20"
      );
      expect(formatDateToHR(new Date("2020-08-02 15:32").getTime())).toBe(
        "August 2, 2020, 15:32"
      );
    });
    it("should format date from string", function () {
      expect(formatDateToHR("2021-08-21 15:20")).toBe("August 21, 15:20");
      expect(formatDateToHR("2020-08-02 15:32")).toBe("August 2, 2020, 15:32");
    });
  });
});

import { login } from "./login.js";

const TEST_USER = {
  email: "unit-test-user@stud.noroff.no",
  password: "test1234",
  accessToken: "testToken",
};

const mockFetchSuccess = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue(TEST_USER),
});

globalThis.fetch = mockFetchSuccess;

const storageMock = {
  setItem: jest.fn((key, value) => (localStorage[key] = value.toString())),
  getItem: jest.fn((key) => localStorage[key] || null),
};

globalThis.localStorage = storageMock;

describe("login test", () => {
  it("should fetch the profile/token data stored in the browser storage", async () => {
    const data = await login();
    expect(data).toEqual(TEST_USER);

    expect(localStorage.setItem).toHaveBeenCalledTimes(2);

    const tokenFromLocalStorage = JSON.parse(globalThis.localStorage.getItem("token"));
    expect(tokenFromLocalStorage).toMatch("testToken");
  });
});

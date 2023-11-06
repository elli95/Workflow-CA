import { login } from "./login.js";
import { logout } from "./logout.js";

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

const localStorageMock = {
  setItem: jest.fn((key, value) => (localStorage[key] = value)),
  getItem: jest.fn((key) => localStorage[key] || null),
  removeItem: jest.fn((key) => delete localStorage[key]),
};

globalThis.localStorage = localStorageMock;

describe("login", () => {
  it("fetches the profile data stored in the browser storage when logging in", async () => {
    const data = await login();
    expect(data).toEqual(TEST_USER);
  });

  it("fetches the token data stored in browser storage when logging in", async () => {
    const tokenFromLocalStorage = JSON.parse(globalThis.localStorage.getItem("token"));
    expect(tokenFromLocalStorage).toMatch("testToken");
  });
});

describe("logout", () => {
  it("checks that the token/profile from browser storage is gone after logging out", async () => {
    await logout();
    expect(localStorage.token).toBeUndefined();
    expect(localStorage.profile).toBeUndefined();
  });
});

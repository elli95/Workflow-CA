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

const storageMock = {
  setItem: jest.fn((key, value) => (localStorage[key] = value.toString())),
  removeItem: jest.fn((key) => delete localStorage[key]),
};

globalThis.localStorage = storageMock;

describe("logout test", () => {
  it("checks that the token/profile from browser storage is gone after logging out", async () => {
    const data = await login();
    expect(data).toEqual(TEST_USER);

    logout();
    expect(localStorage.removeItem).toHaveBeenCalledTimes(2);

    expect(localStorage.removeItem).toHaveBeenCalledWith("profile");
    expect(localStorage.removeItem).toHaveBeenCalledWith("token");

    expect(localStorage.token).toBeUndefined();
    expect(localStorage.profile).toBeUndefined();
  });
});

import localStorageMock from "./LocalStorage.mock.js";
import { logout } from "./logout.js";

const TEST_USER = {
  email: "unit-test-user@stud.noroff.no",
  password: "test1234",
};

globalThis.localStorage = localStorageMock;

describe("logout test", () => {
  it("checks that the token/profile from browser storage is gone after logging out", async () => {
    localStorage.setItem("token", "testToken");
    localStorage.setItem("profile", TEST_USER);

    expect(localStorage.token).toBe("testToken");
    expect(localStorage.profile).toBe(TEST_USER);

    logout();
    expect(localStorage.removeItem).toHaveBeenCalledTimes(2);

    expect(localStorage.removeItem).toHaveBeenCalledWith("profile");
    expect(localStorage.removeItem).toHaveBeenCalledWith("token");

    expect(localStorage.token).toBeUndefined();
    expect(localStorage.profile).toBeUndefined();
  });
});

const fs = require("fs/promises");
const backupAvatar = require("./backupAvatar");

jest.mock("firebase/storage", () => ({
  ref: () => {},
  getStorage: () => {},
  uploadBytes: jest.fn().mockResolvedValue(),
  getDownloadURL: jest.fn().mockResolvedValue("url"),
}));

describe("Given a backupAvatar function", () => {
  describe("When it receives a file and an user id", () => {
    test("Then it should invoke next", async () => {
      const req = {
        file: {
          originalName: "avatar-original.png",
          filename: "uiuiui",
        },
      };
      const next = jest.fn();
      jest.spyOn(fs, "readFile").mockResolvedValue();
      jest.spyOn(fs, "rename").mockResolvedValue();

      await backupAvatar(req, null, next);

      expect(next).toHaveBeenCalledWith();
    });
  });
});

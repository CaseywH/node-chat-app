const expect = require("expect");

const { Users } = require("./users");
var users;
beforeEach(() => {
  users = new Users();
  users.users = [
    {
      id: "1",
      name: "Bill",
      room: "Node Course"
    },
    {
      id: "2",
      name: "Randy",
      room: "JS Course"
    },
    {
      id: "3",
      name: "Tom",
      room: "Node Course"
    }
  ];
});

describe("Users", () => {
  it("should add new user", () => {
    var users = new Users();
    var user = {
      id: "123",
      name: "Casey",
      room: "The Office Fans"
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  //remove user tests
  it("should remove a user", () => {
    var user = users.removeUser("1");
    expect(user.id).toBe("1")
    expect(users.users.length).toBe(2)
  });
  //pass in a user id that doesnt exist
  it("should not remove User", () => {
    var user = users.removeUser("32");
    expect(user).toNotExist();
    expect(users.users.length).toEqual(3);
  });

  //getuser tests
  it("should find user", () => {
    var user = users.getUser("2");
    expect(user.id).toBe("2");
  });
  it("should not find user", () => {
    var user = users.getUser("200");
    expect(undefined);
  });

  it("should return names of users in node coudrse", () => {
    var userList = users.getUserList("Node Course");

    expect(userList).toEqual(["Bill", "Tom"]);
  });
  it("should return names of users in js coudrse", () => {
    var userList = users.getUserList("JS Course");

    expect(userList).toEqual(["Randy"]);
  });
});

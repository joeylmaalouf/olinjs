var FakeDatabase = {
  data: [],
  add: function (obj) {
    FakeDatabase.data.push(obj);
  },
  remove: function (index) {
    return FakeDatabase.data.splice(index, 1);
  }
};

module.exports = FakeDatabase;

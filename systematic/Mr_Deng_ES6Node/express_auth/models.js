const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/express_auth", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: {
    type: String,
    set(value) {
      return require("bcrypt").hashSync(value, 10);
    },
  },
});
const User = mongoose.model("User", UserSchema);

User.db.dropCollection("users");
module.exports = { User };

const bcrypt = require("bcryptjs");

function hash(password: string) {
  const salt = bcrypt.genSaltSync(9);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function compare(password: string, hashedpassword: string) {
  return bcrypt.compareSync(password, hashedpassword);
}

export { hash, compare };

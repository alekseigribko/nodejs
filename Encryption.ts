import bcrypt from 'bcryptjs'

function makeHash(password: string) {
  return bcrypt.hashSync(password)
}

function compare(password : string, hashpassword : string) : boolean {
  return bcrypt.compareSync(password, hashpassword)
}

export default {
  makeHash,
  compare
}

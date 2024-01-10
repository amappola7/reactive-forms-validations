export const userMapper = (user: any): any => {
  const newUser = {
    username: user.email,
    fullname: `${user.firstName} ${user.secondName} ${user.surname} ${user.secondSurname}`,
    email: user.email,
    password: user.password
  }

  return newUser;
}
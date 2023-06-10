import jwt, { Secret } from 'jsonwebtoken';

const createToken = (data: object | string) => {
  const maxAge = 30 * 24 * 60 * 60;
  return jwt.sign({ data }, process.env.JWT_USER_SECRET as Secret, {
    expiresIn: maxAge,
  });
};

export default createToken;

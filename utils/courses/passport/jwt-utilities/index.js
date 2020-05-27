const jwt = require('jsonwebtoken');
// proccess arguments
// lee los comandos de la terminal
// los primeros 2 son node (el proceso) y el archivo que estamos leyendo
// option va poder tener el valor de sign o verify
// proccess.argv = vector de argumentos
const [, , option, secret, nameOrToken] = process.argv;

if (!option || !secret || !nameOrToken) {
  console.log('Missing arguments');
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

if (option == 'sign') {
  console.log(signToken({ sub: nameOrToken }, secret));
} else if (option == 'verify') {
  console.log(verifyToken(nameOrToken, secret));
} else {
  console.log('Option needs to be "sign" or "verify"');
}

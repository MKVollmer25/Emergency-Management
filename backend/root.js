const bcrypt = require('bcrypt')

async function generateRoot() {
  const root_username = 'root';
  const root_password = await bcrypt.hash('P@$$w0rd', 10);

  console.log("Root username: " + root_username)
  console.log("Root password: " + root_password)
}

generateRoot()

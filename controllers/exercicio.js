async function createUser(userData) {
  const { name, email } = userData;

  checkCredentials(name, email);

  await checkForEmailDuplicate(email);

  updateUserData(userData);

  await userRepository.create(userData);

  return await getUserIdByEmail(email);
}

async function checkEmail(email) {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw "Duplicate Email";
}

function updateUserData(userData) {
  userData.createdAt = Date.now();
  userData.active = false;
  userData.balance = 0;
}

function checkCredentials(name, email) {
  if (name.length === 0 || email.length === 0) throw "Invalid data";
}

async function getUserIdByEmail(email) {
  const createdUser = await userRepository.findByEmail(email);
  return createdUser.id;
}

const config = {
	jwt_access_secret: process.env.JWT_ACCESS_SECRET || "change_me",
	bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || "10",
};

export default config;

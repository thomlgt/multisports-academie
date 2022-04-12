export const jwtConstants = {
    secret : process.env.JWT_SECRET_ADMIN_KEY || "secretAdminKey",
    adminUsername : process.env.ADMIN_USERNAME || "admin",
    adminPassword : process.env.ADMIN_PASSWORD || "root",
}
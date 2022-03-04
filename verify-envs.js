
const requiredEnvs = [
  "NEXT_PUBLIC_API_ENDPOINT_URL",
  "EVERIFY_AUTH_TOKEN",
  "SECRET_AUTH_SALT",
  "NEXTAUTH_URL",
  "DIRECTUS_API_AUTH",
  "ENV",
]

const verifyEnvs = () => {
  let foundErrors = false
  requiredEnvs.forEach((env) => {
    if (!process.env[env]) {
      foundErrors = true
      // @ts-ignore
      console.error(`⛔️ Missing ${env} env!`)
    }
  })
  if (foundErrors)
    throw new Error(`Please read the list of missing envs above, and add those envs to .env file!`)
}

module.exports = { verifyEnvs }

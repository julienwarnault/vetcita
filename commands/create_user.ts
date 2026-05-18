import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { withTransaction } from '#app/shared/utils/with_transaction'
import { RegisterUser } from '#app/identity/actions/register_user'

export default class CreateUser extends BaseCommand {
  static commandName = 'create:user'
  static description = 'Create a user from the CLI'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const registerUser = await this.app.container.make(RegisterUser)

    const fullName = await this.prompt.ask('Full name?')
    const email = await this.prompt.ask('Email?')
    const password = await this.prompt.secure('Password?')
    const passwordConfirmation = await this.prompt.secure('Confirm password?')
    const tenantName = await this.prompt.ask('Tenant name?')

    if (password !== passwordConfirmation) {
      this.logger.error('Passwords do not match')
      this.exitCode = 1
      return
    }

    try {
      const { user } = await withTransaction(() => {
        return registerUser.execute({
          fullName,
          email,
          password,
          tenantName,
        })
      })

      this.logger.success('User created successfully')
      this.logger.info(`User ID: ${user.id}`)
      this.logger.info(`Email: ${user.email}`)
    } catch (error) {
      this.logger.error('Failed to create user')
      this.logger.error(error instanceof Error ? error.message : String(error))
      this.exitCode = 1
    }
  }
}

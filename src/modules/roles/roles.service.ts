import USER_ROLES, { RolesDocument } from '../../models/user-roles'

export default class RoleService {
  public async cretaRole(payload: RolesDocument) {
    try {
      await USER_ROLES.create(payload)

      return { message: 'Success create roles', result: null }
    } catch (error) {
      throw error
    }
  }
}

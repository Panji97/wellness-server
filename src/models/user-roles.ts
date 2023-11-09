import { Schema, Types, model } from 'mongoose'

interface RolesProps {
  _id: string
  name: string
  status: boolean
  sites: string
  menus: Menus[]
}

interface Menus {
  _id: string
  name: string
  icon: string
  link: string
  order: number
  status: boolean
  child: Child[]
  privillage: Privillage
}

interface Child {
  name: string
  icon: string
  link: string
  order: string
  status: boolean
  privillage: Privillage
}

interface Privillage {
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
  export: boolean
  import: boolean
}

interface RolesDocument extends Document, RolesProps {}

const ROLES_SCHEMA = new Schema(
  {
    name: { type: String, unique: true },
    menus: [
      {
        name: { type: String },
        icon: { type: String },
        link: { type: String },
        order: { type: Number },
        status: { type: Boolean, default: true },
        privillage: {
          read: { type: Boolean, default: false },
          create: { type: Boolean, default: false },
          update: { type: Boolean, default: false },
          delete: { type: Boolean, default: false },
          import: { type: Boolean, default: false },
          export: { type: Boolean, default: false }
        },
        child: [
          {
            name: { type: String },
            icon: { type: String },
            link: { type: String },
            order: { type: Number },
            status: { type: Boolean, default: true },
            privillage: {
              read: { type: Boolean, default: false },
              create: { type: Boolean, default: false },
              update: { type: Boolean, default: false },
              delete: { type: Boolean, default: false },
              import: { type: Boolean, default: false },
              export: { type: Boolean, default: false }
            }
          }
        ]
      }
    ]
  },
  {
    timestamps: true
  }
)

const ROLES_MODEL = model<RolesDocument>('user_roles', ROLES_SCHEMA)

export default ROLES_MODEL
export type { RolesDocument }

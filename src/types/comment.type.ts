import { User } from './user.type'

export interface Comment {
  _id?: string
  comment: string
  createdAt?: string
  updatedAt?: string
  video?: string
  channel?: User
  like?: []
  dislike?: []
  parent?: string
  children?: Comment[]
  isHidden?: boolean
}

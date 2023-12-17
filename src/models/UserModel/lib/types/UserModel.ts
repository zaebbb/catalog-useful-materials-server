import type { UploadedFile } from 'express-fileupload'
import type fileUpload from 'express-fileupload'

export interface UserProfileAvatar extends Record<string, UploadedFile | UploadedFile[]> {
  avatar: fileUpload.UploadedFile
}

export interface UserProfile {
  avatar?: fileUpload.UploadedFile
  name?: string
  surname?: string
  patronymic?: string
  accGoogle?: boolean
  accGithub?: string
}

export interface UserProfileData extends Omit<UserProfile, 'avatar'> {
  avatar?: string
}

export interface UserBaseData {
  id: number
  username: string
  email: string
  avatar?: string
}

export interface Access {
  name: string
  code: string
}

export interface ProfileData extends Omit<UserBaseData, 'id'> {
  userData?: UserProfile
}

export interface UserData extends UserBaseData {
  userData?: UserProfile
  accesses?: Access[]
  avatar?: string
}

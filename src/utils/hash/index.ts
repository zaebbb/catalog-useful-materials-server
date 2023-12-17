import bcrypt from 'bcrypt'

export const generateHash = async (text: string): Promise<string> => {
  return await bcrypt.hash(text, 10)
}

export const checkHash = async (text: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(text, hash)
}

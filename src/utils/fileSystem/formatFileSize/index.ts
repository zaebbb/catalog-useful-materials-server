export type ResultFileSize = 'MB' | 'GB' | 'KB' | 'B'

export const formatFileSize = (size: number, format: ResultFileSize): number => {
  switch (format) {
    case 'GB':
      return size * 1024 * 1024 * 1024
    case 'MB':
      return size * 1024 * 1024
    case 'KB':
      return size * 1024
    case 'B':
    default:
      return size
  }
}

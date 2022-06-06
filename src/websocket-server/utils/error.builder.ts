import { ErrorDto } from './dto/error.dto'

export function newError(description: string, statusCode: number): ErrorDto {
  return {
    type: 'error',
    description,
    statusCode,
  }
}

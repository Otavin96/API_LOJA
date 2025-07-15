import { AppError } from "./app-error";

export class InvalidCredentialsError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}

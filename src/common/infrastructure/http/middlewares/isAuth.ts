import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { JwtAuthProvider } from "../../providers/auth-provider/auth-provider.jwt";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";

export function isAuth(
  request: Request,
  response: Response,
  _next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new BadRequestError("Token is missing");
  }

  const [, access_token] = authHeader.split(" ");

  const authProviderJwt: JwtAuthProvider = container.resolve("AuthProviderJwt");
  const { client_id, roles } = authProviderJwt.verifyAuthKey(access_token);
  if (!client_id) {
    throw new BadRequestError("Invalid token");
  }

  request.client = {
    id: client_id,
    roles: roles,
  };

  return _next();
}

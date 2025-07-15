import {
  AuthProvider,
  GenerateAuthKeyProps,
  VerifyAuthKeyProps,
} from "@/common/domain/providers/auth-provider";
import { env } from "../../env";
import { InvalidCredentialsError } from "@/common/domain/erros/invalid-credentials-error";
import jwt from "jsonwebtoken";
import { StatusPermission } from "@/clients/domain/models/clients.model";

type DecodedTokenProps = {
  sub: string;
  roles: StatusPermission
};

export class JwtAuthProvider implements AuthProvider {
  verifyAuthKey(token: string): VerifyAuthKeyProps {
    try {
      const decodedToken = jwt.verify(token, env.MY_SECRET);
      const { sub, roles } = decodedToken as DecodedTokenProps;
      return { client_id: sub, roles };
    } catch {
      throw new InvalidCredentialsError("Invalid credentials");
    }
  }
  generateAuthKey(client_id: string, roles: StatusPermission): GenerateAuthKeyProps {

    const payload = {roles};
    const options: jwt.SignOptions = {
      expiresIn: '1d',
      subject: client_id
    }

    const access_token = jwt.sign(payload, env.MY_SECRET, options)
    return { access_token };
  }
}

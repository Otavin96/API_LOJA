import "@/categories/infrastructure/container";
import "@/clients/infrastructure/container";
import "@/products/infrastructure/container";

import { container } from "tsyringe";
import { BcryptjsHashProvider } from "../providers/hash-provider/bcryptjs-hash.provider";
import { JwtAuthProvider } from "../providers/auth-provider/auth-provider.jwt";
import { LocalUploaderProvider } from "../providers/storage-provider/local-uploader-provider";

container.registerSingleton("HashProvider", BcryptjsHashProvider);
container.registerSingleton("AuthProviderJwt", JwtAuthProvider);
container.registerSingleton("UploaderProvider", LocalUploaderProvider);

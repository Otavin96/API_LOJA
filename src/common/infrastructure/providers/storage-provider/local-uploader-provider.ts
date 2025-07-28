import {
  UploaderProvider,
  UploadProps,
} from "@/common/domain/providers/uploader-provider";
import { basename, resolve } from "path";
import { promises as fs } from "fs";
import { randomUUID } from "crypto";

export class LocalUploaderProvider implements UploaderProvider {
  private uploadFolder = resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "uploads"
  );

  async upload({ filename, filetype, body }: UploadProps): Promise<string> {
    const extension = filetype.split("/")[1];
    const uniqueName = `${randomUUID()}.${extension}`;
    const filePath = resolve(this.uploadFolder, uniqueName);

    // Garante que a pasta exista
    await fs.mkdir(this.uploadFolder, { recursive: true });

    // Salva o arquivo
    await fs.writeFile(filePath, body);

    // Retorna a URL (ajuste conforme sua aplicação serve a pasta)
    return `/uploads/${uniqueName}`;
  }

  async delete(fileUrl: string): Promise<void> {
    try {
      const filename = basename(fileUrl); // extrai apenas o nome do arquivo
      const filePath = resolve(this.uploadFolder, filename);
      await fs.unlink(filePath);
    } catch (error) {
      // Opcional: logar ou ignorar erros de exclusão (ex: arquivo já deletado)
      console.warn(`Falha ao deletar arquivo ${fileUrl}:`, error);
    }
  }
}

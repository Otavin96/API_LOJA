export type UploadProps = {
    filename: string;
    filetype: string;
    body: Buffer
}

export interface UploaderProvider {
    upload: (param: UploadProps) => Promise<string>
}
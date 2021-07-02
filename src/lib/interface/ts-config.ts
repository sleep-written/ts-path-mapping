export interface TsConfig {
    compilerOptions?: {
        outDir?: string;
        rootDir?: string;
        baseUrl?: string;
        paths?: {
            [key: string]: string[];
        };
    };
}

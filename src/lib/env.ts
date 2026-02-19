export function getRequiredEnv(name: string): string {
    const value = import.meta.env[name as keyof ImportMetaEnv] as string | undefined;
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}

import type { DeliveryMethod, Provider } from "@/types/DeliveryMethod";

export const placeholderArray = (length: number) => {
    return new Array(length).fill(null);
};

export const serialize = (
    obj: Record<string, any>,
    parentKey?: string
): Record<string, string> => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        const fullKey = parentKey ? `${parentKey}[${key}]` : key;
        if (typeof value === "object" && value !== null) {
            Object.assign(acc, serialize(value, fullKey));
        } else if (value !== undefined) {
            acc[fullKey] = value.toString();
        }
        return acc;
    }, {} as Record<string, string>);
};

export const findProviderById = (
    content: DeliveryMethod[],
    providerId: string | undefined
): Provider | undefined => {
    for (const method of content) {
        const provider = method.providers.find(
            (provider) => provider._id === providerId
        );
        if (provider) return provider;
    }
    return undefined;
};

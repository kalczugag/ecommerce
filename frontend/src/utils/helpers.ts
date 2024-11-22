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

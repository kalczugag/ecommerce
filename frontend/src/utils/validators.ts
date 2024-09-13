type ValidatorFunction = (value: any) => string | undefined;

export const required = (value: any) => (value ? undefined : "Required");

export const mustBeNumber = (value: number) => {
    return isNaN(value) ? "Must be a number" : undefined;
};

export const validateEmail: ValidatorFunction = (email: string) => {
    const emailPattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email) ? undefined : "Invalid email address";
};

export const minValue = (min: number) => {
    return (value: number) => {
        return isNaN(value) || value >= min
            ? undefined
            : `Should be greater or equal to ${min}`;
    };
};

export const maxValue = (max: number) => {
    return (value: number) =>
        isNaN(value) || value <= max
            ? undefined
            : `Should be smaller or equal to ${max}`;
};

export const compose = (
    ...validators: Array<ValidatorFunction>
): ValidatorFunction => {
    return (value: any): string | undefined => {
        return validators.reduce(
            (error: string | undefined, validator: ValidatorFunction) =>
                error || validator(value),
            undefined
        );
    };
};

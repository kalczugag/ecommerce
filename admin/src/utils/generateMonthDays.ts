import dayjs from "dayjs";

export const generateMonthDays = (year: number, month: number): string[] => {
    const daysInMonth = dayjs(`${year}-${month}`).daysInMonth();
    return Array.from({ length: daysInMonth }, (_, i) => {
        const day = dayjs(`${year}-${month}-${i + 1}`);
        return day.format("MMM D");
    });
};

export const generateLastMonths = (monthsCount: number): string[] => {
    return Array.from({ length: monthsCount }, (_, i) =>
        dayjs().subtract(i, "month").format("MMM")
    ).reverse();
};

export const generateRandomData = (
    length: number,
    min = 1000,
    max = 5000
): number[] => {
    return Array.from(
        { length },
        () => Math.floor(Math.random() * (max - min + 1)) + min
    );
};

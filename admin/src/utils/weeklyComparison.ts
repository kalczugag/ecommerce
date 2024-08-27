export const weeklyComparison = (thisWeek: number, lastWeek: number) => {
    const difference = thisWeek - lastWeek;
    const percentageDifference = (
        (difference / Math.abs(thisWeek)) *
        100
    ).toFixed(2);
    return +percentageDifference;
};

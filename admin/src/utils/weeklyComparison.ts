export const weeklyComparison = (thisWeek: number, lastWeek: number) => {
    if (thisWeek === 0) {
        return lastWeek === 0 ? 0 : -100;
    }

    const difference = thisWeek - lastWeek;
    const percentageDifference = (
        (difference / Math.abs(thisWeek)) *
        100
    ).toFixed(2);

    return +percentageDifference;
};

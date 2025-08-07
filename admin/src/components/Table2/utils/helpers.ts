type SortOrder = "asc" | "desc";

const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const getComparator = <Key extends keyof any>(
    order: SortOrder,
    orderBy: Key
): ((
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number) => {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

export { descendingComparator, getComparator, type SortOrder };

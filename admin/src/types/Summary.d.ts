export interface Summary {
    orders: {
        total: number;
        count: number;
        paid: number;
        itemsCount: number;
        thisWeek: number;
        lastWeek: number;
        thisMonth: number;
        lastMonth: number;
        thisYear: number;
        lastYear: number;
    };
    users: {
        count: number;
        thisWeek: number;
        lastWeek: number;
        thisMonth: number;
        lastMonth: number;
        thisYear: number;
        lastYear: number;
    };
    visitors: {
        total: number;
        loggedIn: number;
        anonymous: number;
        thisWeek: number;
        lastWeek: number;
        thisMonth: number;
        lastMonth: number;
        thisYear: number;
        lastYear: number;
    };
}

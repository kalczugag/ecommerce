export interface Manage {
    key: string;
    label: string;
    element: (props?: any) => JSX.Element;
    subTabs?: Manage[];
}

/**
 * Interface defining actions for handling sub-tab changes.
 * @typedef {Object} ManageAction
 */
export interface ManageAction {
    /**
     * The current sub-tab index.
     * @type {number}
     */
    currentSubTab?: number;

    /**
     * Function to handle sub-tab index change.
     * @param {number} newValue - The index of the new sub-tab.
     * @param {[key: string]: string} additionalData - Additional data associated with the new sub-tab.
     */
    handleSubTabChange: (
        newValue: number,
        additionalData?: { [key: string]: string }
    ) => void;
}

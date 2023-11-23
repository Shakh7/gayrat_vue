export type Header = {
    field: string;
    label: string;
    searchable?: boolean;
    search_type?: 'text' | 'select' | 'date',
    options?: { label: string, value: string | number }[],
    query?: string;
    description?: string | null;
    style?: {
        width?: string;
        minWidth?: string;
        maxWidth?: string;
    }
};

type _TableRow = {
    active: boolean;
    classes: string;
};

export type DataTableItem = Record<string, any> & {
    _row?: _TableRow;
};
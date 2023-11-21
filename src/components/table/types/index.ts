export type Header = {
    field: string;
    label: string;
};

type _TableRow = {
    active: boolean;
    classes: string;
};

export type DataTableItem = Record<string, any> & {
    _row?: _TableRow;
};
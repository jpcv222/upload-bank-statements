export interface FileFormatI {
    id_bank: number;
    initial_row: number;
    max_column_number: number;
    min_column_number: number; 
    date_position: number;
    reference_position: number;
    egress_position: number;
    income_position: number;
    bank_balance_position: number;
    date_format: string;
}
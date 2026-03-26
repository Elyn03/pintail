export interface Trip {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  budget_target?: number;
  budget_max?: number;
  description?: string;
}

export type ModuleId =
  | "osi-model"
  | "networking-tools"
  | "modem-router"
  | "eia-tia-standard"
  | "bits-nibbles-bytes"
  | "binary-calculation"
  | "communication-types"
  | "network-topologies"
  | "802.3-ethernet-standards"
  | "patch-vs-crossover-cables"
  | "cable-ratings"
  | "esd-emi-emp"
  | "wireless-802-11"
  | "802.11-wireless-standards"
  | "wired-vs-wireless"
  | "wan-technologies"
  | "data-link-layer"
  | "hexadecimal"
  | "layer-2-switches"
  | "network-layer-ip-addresses"
  | "private-ip-classes"
  | "ip-address-classes"
  | "ports"
  | "nat"
  | "ftp"
  | "ip-address-assignment"
  | "dns";

export interface QuestionWording {
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface MasterQuestion {
  id: string;
  moduleId: ModuleId;
  moduleName: string;
  category: string;
  primary: QuestionWording;
  alternate: QuestionWording;
}

export interface TableColumnConfig {
  key: string;
  label: string;
  options?: string[];
}

export interface TableRowData {
  id: string | number;
  [key: string]: string | number;
}

export interface MasterTableActivity {
  id: string;
  moduleId: ModuleId;
  moduleName: string;
  type: "table";
  title: string;
  description: string;
  columns: TableColumnConfig[];
  rows: TableRowData[];
  customMatches?: Record<string, (correct: string, input: string) => boolean>;
}

export interface MasterWireActivity {
  id: string;
  moduleId: ModuleId;
  moduleName: string;
  type: "wire-ordering";
  title: string;
  description: string;
}

export type MasterActivity = MasterTableActivity | MasterWireActivity;

export type ActivePracticeItem =
  | {
  type: "question";
  id: string;
  moduleId: ModuleId;
  moduleName: string;
  category: string;
  wordingType: "primary" | "alternate";
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
  points: 2;
}
  | {
  type: "activity";
  id: string;
  moduleId: ModuleId;
  moduleName: string;
  activity: MasterActivity;
  blankCellKeys?: string[];
  points: 10;
};

export type GlobalMessage = {
  status: number;
  reason: string;
  message?: string;
};

export type PathParams = {
  cluster?: string;
  namespace?: string;
  apiVersion?: string;
  module?: string;
  dryRun?: boolean;
  name?: string;
};

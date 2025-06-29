export type BlogBtnProp = {
  name: string;
  variant: "light" | "primary" | "outline" | "cancel" | "disabled";
  type: "submit" | "reset" | "button" | undefined;
  onClick?: (value: any) => void;
};

export type BlogInputProp = {
  isPassword: boolean;
  name: string;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  label: string;
};

export type BlogTextareaProp = {
  name: string;
  placeholder: string;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  label: string;
};

export type BlogTagProp = {
  title: string;
  tag: string[];
  setTag: (value: string[]) => void;
};

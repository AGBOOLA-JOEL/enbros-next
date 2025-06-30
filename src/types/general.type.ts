export type BlogBtnProp = {
  name: string;
  variant: "light" | "primary" | "outline" | "cancel" | "disabled";
  type: "submit" | "reset" | "button" | undefined;
  onClick?: (value: any) => void;
};

export type BlogInputProp = {
  isPassword: boolean;
  name: string;
  register: any;
  label: string;
};

export type BlogTextareaProp = {
  name: string;
  placeholder: string;
  register: any;
  label: string;
};

export type BlogTagProp = {
  title: string;
  tag: string[];
  setTag: (value: string[]) => void;
};

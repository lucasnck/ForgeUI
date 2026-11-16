export interface RegisteredValues {
  profile: { name: string };
  conditional: string;
  readOnly: string;
}
export const registeredDefaults: RegisteredValues = {
  profile: { name: "" },
  conditional: "",
  readOnly: "ReadOnly",
};

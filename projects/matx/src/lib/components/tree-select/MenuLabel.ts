/*
if (value)
  value will be parsed to this interface
  if not possible, value will be used as label

if(!value)
  key will be used as label

*/
export interface MenuLabel {
  index: number;
  label: string;
  id: string;
  title: string;
}

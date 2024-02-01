import { ReactNode } from "react";

interface ListProps {
  children: ReactNode;
}
const List: React.FC<ListProps> = ({ children }) => {
  return <ul className="divide-y divide-slate-100">{children}</ul>;
};

export default List;

interface NavProps {
  children: React.ReactNode;
}

const Nav: React.FC<NavProps> = ({ children }) => {
  return (
    <nav className="py-4 px-6 text-lg font-medium">
      <ul className="flex space-x-3">{children}</ul>
    </nav>
  );
};
export default Nav;

interface NavbarProps {
  children: React.ReactNode;
}
function Navbar({ children }: NavbarProps) {
  return <nav className='nav-bar'>{children}</nav>;
}

export default Navbar;

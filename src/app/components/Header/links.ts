export type NavLink = {
  id: number;
  href: string;
  text: string;
};
export const links: NavLink[] = [
  {
    id: 1,
    href: '/',
    text: 'Home',
  },
  {
    id: 2,
    href: '/about',
    text: 'About Us',
  },
  {
    id: 3,
    href: '/contact',
    text: 'Contact',
  },
  {
    id: 4,
    href: '/pricing',
    text: 'Pricing',
  },
];

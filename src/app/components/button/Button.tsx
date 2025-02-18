import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  class: string;
}
const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { children } = props;
  return <button className={props.class}>{children}</button>;
};

export default Button;

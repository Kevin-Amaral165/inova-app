import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';
import { ButtonVariant, HtmlType } from '@/src/enum/enum';

describe('Button Component', (): void => {
  it('renders children correctly', (): void => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', (): void => {
    const handleClick: jest.Mock = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is true', (): void => {
    render(<Button disabled>Click me</Button>);
    const button: HTMLElement = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('shows loading state', (): void => {
    render(<Button loading>Click me</Button>);
    const button: HTMLElement = screen.getByRole('button');
    const spinner: Element | null = screen.getByRole('button').querySelector('.animate-spin');
    
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(spinner).toBeInTheDocument();
  });

  it('applies correct variant classes', (): void => {
    const { rerender } = render(<Button variant={ButtonVariant.PRIMARY}>Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-green-500');

    rerender(<Button variant={ButtonVariant.DRAWER}>Drawer</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-[#84C318]');

    rerender(<Button variant={ButtonVariant.DEFAULT}>Default</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-200');
  });

  it('applies custom className', (): void => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('has correct type attribute', (): void => {
    const { rerender } = render(<Button htmlType={"submit" as HtmlType}>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

    rerender(<Button htmlType={"button" as HtmlType}>Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});

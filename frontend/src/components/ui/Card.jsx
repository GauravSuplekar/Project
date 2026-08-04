import { cn } from '../../lib/cn';

const Card = ({ children, className, hover = false, ...props }) => (
  <div
    className={cn(
      'rounded-[2rem] border border-slate-200 bg-white shadow-card',
      hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default Card;

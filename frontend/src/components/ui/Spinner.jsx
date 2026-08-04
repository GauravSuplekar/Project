import { cn } from '../../lib/cn';

const Spinner = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-[3px]',
    lg: 'h-14 w-14 border-4',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-brand border-t-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;

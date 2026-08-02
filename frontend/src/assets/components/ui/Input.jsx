import { cn } from '../../lib/cn';

const Input = ({
  label,
  error,
  className,
  id,
  ...props
}) => {
  const inputId = id || props.name;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-base font-medium text-brand-dark"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm text-brand-dark',
          'placeholder:text-gray-400 transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand-dark',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-red-400' : 'border-slate-300',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;

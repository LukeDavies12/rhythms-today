import { forwardRef } from 'react';

interface TextInputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  required?: boolean;
  name?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  className = '',
  required = false,
  name,
  ...props
}, ref) => {
  const inputId = name || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          className="mb-2 font-bold text-neutral-900 dark:text-neutral-100"
          htmlFor={inputId}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className={`px-3 py-2 border-2 font-medium
          bg-white dark:bg-neutral-900
          text-neutral-900 dark:text-neutral-100
          placeholder:text-neutral-500 dark:placeholder:text-neutral-400
          border-neutral-300 dark:border-neutral-700
          focus:border-brand focus:outline-none
          ${error ? 'border-red-500 focus:border-red-500' : ''}
          transition-all duration-100 ease-in`}
        {...props}
      />
      {error && (
        <span className="mt-1 text-sm text-red-500 font-medium">
          {error}
        </span>
      )}
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
import { forwardRef } from 'react';

interface TextInputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
  onKeyDown,
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
          className="mb-1 font-medium text-neutral-600 dark:text-neutral-400"
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
        onKeyDown={onKeyDown}
        name={name}
        required={required}
        className={`px-2 py-1.5 font-medium
          bg-neutral-100 hover:bg-neutral-200 focus:bg-neutral-200 dark:bg-neutral-800
          text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900
          placeholder:text-neutral-500 dark:placeholder:text-neutral-400
           focus:outline-none
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

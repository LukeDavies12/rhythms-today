import { forwardRef } from 'react';

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  error?: string;
  className?: string;
  required?: boolean;
  name?: string;
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
  autoFocus?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  placeholder,
  value,
  onChange,
  onKeyDown,
  error,
  className = '',
  required = false,
  name,
  rows = 3,
  maxLength,
  showCharCount = false,
  autoFocus = false,
  ...props
}, ref) => {
  const inputId = name || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const currentLength = value?.length || 0;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          className="mb-1 font-medium text-neutral-600 dark:text-neutral-400"
          htmlFor={inputId}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        name={name}
        required={required}
        rows={rows}
        maxLength={maxLength}
        autoFocus={autoFocus}
        className={`px-2 py-1.5 font-medium resize-none
          bg-neutral-100 hover:bg-neutral-200 focus:bg-neutral-200 dark:bg-neutral-800
          text-neutral-700 dark:text-neutral-300
          placeholder:text-neutral-500 dark:placeholder:text-neutral-400
          border ${error ? 'border-red-500 focus:border-red-500' : 'border-transparent'}
          focus:outline-none transition-all duration-100 ease-in`}
        {...props}
      />
      <div className="mt-1 flex justify-between items-center">
        {error && (
          <span className="text-sm text-red-500 font-medium">
            {error}
          </span>
        )}
        {showCharCount && maxLength && (
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;

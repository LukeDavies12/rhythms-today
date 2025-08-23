import React, { useState, useRef, useEffect } from 'react';

interface DatepickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
}

export function Datepicker({
  value,
  onChange,
  placeholder = 'Select date',
  className = '',
  disabled = false,
  minDate,
  maxDate,
  dateFormat = 'MM/DD/YYYY'
}: DatepickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value.getFullYear(), value.getMonth(), 1) : new Date()
  );
  const [inputValue, setInputValue] = useState('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    switch (dateFormat) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      default:
        return `${month}/${day}/${year}`;
    }
  };

  const parseDate = (dateString: string): Date | null => {
    const cleanString = dateString.replace(/[^\d]/g, '');
    if (cleanString.length !== 8) return null;

    let day, month, year;
    
    switch (dateFormat) {
      case 'DD/MM/YYYY':
        day = parseInt(cleanString.substring(0, 2));
        month = parseInt(cleanString.substring(2, 4)) - 1;
        year = parseInt(cleanString.substring(4, 8));
        break;
      case 'YYYY-MM-DD':
        year = parseInt(cleanString.substring(0, 4));
        month = parseInt(cleanString.substring(4, 6)) - 1;
        day = parseInt(cleanString.substring(6, 8));
        break;
      default:
        month = parseInt(cleanString.substring(0, 2)) - 1;
        day = parseInt(cleanString.substring(2, 4));
        year = parseInt(cleanString.substring(4, 8));
    }

    const date = new Date(year, month, day);
    return isValidDate(date) ? date : null;
  };

  const isValidDate = (date: Date): boolean => {
    if (isNaN(date.getTime())) return false;
    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;
    return true;
  };

  useEffect(() => {
    if (value) {
      setInputValue(formatDate(value));
      setCurrentMonth(new Date(value.getFullYear(), value.getMonth(), 1));
    } else {
      setInputValue('');
    }
  }, [value, dateFormat]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const parsedDate = parseDate(newValue);
    if (parsedDate && isValidDate(parsedDate)) {
      onChange?.(parsedDate);
      setCurrentMonth(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1));
    } else if (newValue === '') {
      onChange?.(null);
    }
  };

  const handleDateSelect = (date: Date) => {
    if (!isValidDate(date)) return;
    
    onChange?.(date);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newMonth;
    });
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setFullYear(prev.getFullYear() + (direction === 'next' ? 1 : -1));
      return newMonth;
    });
  };

  const generateCalendarDays = () => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }

    return days;
  };

  const isDateSelected = (date: Date): boolean => {
    return value ? 
      date.getDate() === value.getDate() &&
      date.getMonth() === value.getMonth() &&
      date.getFullYear() === value.getFullYear()
      : false;
  };

  const isDateInCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const isDateDisabled = (date: Date): boolean => {
    return !isValidDate(date);
  };

  const calendarDays = generateCalendarDays();

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => !disabled && setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-2 border rounded-md
            bg-white dark:bg-neutral-800
            border-neutral-300 dark:border-neutral-600
            text-neutral-900 dark:text-neutral-100
            placeholder-neutral-500 dark:placeholder-neutral-400
            focus:outline-none focus:ring-2 focus:ring-brand-400 dark:focus:ring-brand-300
            focus:border-transparent
            transition-all duration-200 ease-out
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          readOnly
        />
        
        {/* Calendar Icon */}
        <div 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
        >
          <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg p-4 min-w-[300px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateYear('prev')}
                className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => navigateMonth('prev')}
                className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            <div className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth('next')}
                className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => navigateYear('next')}
                className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm font-medium text-neutral-500 dark:text-neutral-400 p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              const isSelected = isDateSelected(date);
              const isCurrentMonth = isDateInCurrentMonth(date);
              const isDisabled = isDateDisabled(date);
              const isToday = new Date().toDateString() === date.toDateString();

              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  disabled={isDisabled}
                  className={`
                    p-2 text-sm rounded transition-all duration-200 ease-out
                    ${isSelected 
                      ? 'bg-brand text-neutral-200 font-bold hover:brightness-110' 
                      : isCurrentMonth 
                        ? 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                        : 'text-neutral-400 dark:text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-750'
                    }
                    ${isToday && !isSelected ? 'ring-2 ring-brand-400 dark:ring-brand-300' : ''}
                    ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                    active:scale-95
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700">
            <button
              onClick={() => handleDateSelect(new Date())}
              className="w-full px-4 py-2 text-sm font-medium text-brand hover:bg-brand hover:text-neutral-200 rounded transition-all duration-200 ease-out"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
'use client'
import clsx from 'clsx'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
  lable: string
  id: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  disabled?: boolean
  pattern: RegExp
  text: string
  defaultValue?:string
}

const Input: React.FC<InputProps> = ({
  lable,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  pattern,
  text,
  defaultValue,
}) => {
  return (
    <>
      <div>
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor={id}>
          {lable}
        </label>
        <div className="mt-2">
          <input
            type={type}
            defaultValue={defaultValue}
            id={id}
            autoComplete={id}
            disabled={disabled}
            {...register(id, {
              required,
              pattern: {
                value: pattern,
                message: text,
              },
            })}
            className={clsx(
              `
            form-input block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6
            `,
              errors[id] && 'focus:ring-rose-500',
              disabled && 'opacity-50 cursor-default'
            )}
          />
          {errors[id] && (
            <span className="text-red-500 text-sm font-semibold">
              {errors[id]?.type === 'required'
                ? 'This field is required'
                : text}
            </span>
          )}
        </div>
      </div>
    </>
  )
}

export default Input

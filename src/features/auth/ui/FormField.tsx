interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export default function FormField({
  id,
  name,
  label,
  type = "text",
  placeholder = "",
  required = false,
  error,
}: FormFieldProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

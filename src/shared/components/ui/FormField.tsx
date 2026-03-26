import "../styles/FormField.css"

interface FormFieldProps {
  id: string;
  name: string;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "date";
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string | number ;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function FormField({
  id,
  name,
  label,
  type = "text",
  placeholder = "",
  required = false,
  error,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

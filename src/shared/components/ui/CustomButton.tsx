import "../styles/CustomButton.css";
import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

export type ButtonVariant = "contained" | "outlined";
export type ButtonColor = "primary" | "secondary";
export type ButtonSize = "small" | "medium" | "large";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  loading?: boolean;
  navigateLink?: string;
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      variant = "contained",
      color = "primary",
      size = "medium",
      loading = false,
      navigateLink = "",
      children,
      disabled,
      className = "",
      onClick,
      ...props
    },
    ref
  ) => {
    const navigate = useNavigate();

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
      if (navigate && !loading && !disabled) {
        navigate(navigateLink);
        return;
      }

      onClick?.(e);
    };

    const baseClasses = [
      "custom-btn",
      `${variant}`,
      `${color}`,
      `${size}`,
      loading && "loading",
      disabled && "disabled",
    ].filter(Boolean).join(" ");

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${className}`}
        disabled={loading || disabled}
        onClick={handleClick}
        {...props}
      >
        {loading ? (
          <span className="btn-loader" />
        ) : (
          children
        )}
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
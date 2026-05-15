import { Link } from "react-router-dom";

export function PrimaryButton({ to, children, className = "", ...props }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-full bg-dusty px-6 py-3 text-sm font-medium tracking-wide text-white transition duration-300 hover:-translate-y-0.5 hover:bg-lavender hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusty ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({ to, children, className = "", ...props }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-full border border-dusty px-6 py-3 text-sm font-medium tracking-wide text-charcoal transition duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusty ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

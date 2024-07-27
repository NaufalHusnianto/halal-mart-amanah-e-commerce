export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={`block font-medium text-sm text-foreground ` + className}
        >
            {value ? value : children}
        </label>
    );
}

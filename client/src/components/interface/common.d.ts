export interface CustomButtonProps {
    type?: string;
    title: string;
    backgroundColor: string;
    hoverBackgroundColor?: string;
    color: string;
    padding: string;
    fullWidth?: boolean;
    icon?: ReactNode;
    disabled?: boolean;
    handleClick?: () => void;
  }
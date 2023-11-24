import { Button, ButtonProps} from "./button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonProps{
    isLoading:boolean
}

export default function LoadingButton({children, isLoading, ...props}:LoadingButtonProps){
    return (
        <Button {...props} disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin mr-3"/>}
            {children}
        </Button>
    )
}


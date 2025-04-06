import { Component, ReactNode } from "react";

type Props = {
    children: ReactNode
};

type State = {
    hasError: boolean;
    error?: Error|null;
};

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    override render() {
        if (this.state.hasError) {
            return <div>Something went wrong: {this.state.error?.message}</div>;
        }

        return this.props.children;
    }
}
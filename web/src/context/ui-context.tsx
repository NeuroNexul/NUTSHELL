import { Context, VNode, createContext } from "preact";
import { useState } from "preact/hooks";

export type UIContextType = {
    isSidebarOpen: boolean;
    toggleSidebar?: () => void;
};

export const UIContext: Context<UIContextType> = createContext<UIContextType>({
    isSidebarOpen: false,
    toggleSidebar: () => { },
});

export const UIConsumer = UIContext.Consumer;
export function UIProvider({ children }: { children: VNode | VNode[] }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return <UIContext.Provider value={{
        isSidebarOpen,
        toggleSidebar,
    }}>{children}</UIContext.Provider>;
}

export default UIContext;
import React from 'preact';
import { useContext } from 'preact/hooks';
import style from './layout.module.scss';
import UIContext from '../../context/ui-context';
import AsideInner from './aside';

type Props = {
    children?: React.VNode | React.VNode[];
}

export default function Layout({ children }: Props) {
    const ui_context = useContext(UIContext);

    return (
        <div className={style.main} data-sideopen={ui_context.isSidebarOpen}>
            <div className={style.overlay} onClick={ui_context.toggleSidebar}></div>

            <aside>
                <AsideInner />
            </aside>

            <main>
                {children}
            </main>
        </div>
    )
}
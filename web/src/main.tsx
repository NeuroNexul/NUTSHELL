// @ts-nocheck
import { render } from 'preact'
import Home from './routes/home/index.tsx'
import Layout from './routes/layout/layout.tsx';
import { UIProvider } from './context/ui-context.tsx';
import Router from 'preact-router';
import Error404 from './routes/404/index.tsx';

function App() {
    return (
        <UIProvider>
            <Layout>
                <Router>
                    <Home path="/" />
                    <Error404 default />
                </Router>
            </Layout>
        </UIProvider>
    )
}

render(<App />, document.getElementById('app')!);

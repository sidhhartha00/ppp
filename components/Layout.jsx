import TransitionLayout from './TransitionLayout';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <TransitionLayout>
            <Navigation />
            <main id="content">
                {children}
           
            </main>
        </TransitionLayout>
    );
}
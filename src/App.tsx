import './App.css';
import MarkdownEditor from './components/MarkdownEditor';
import MessageBox from './components/MessageBox';


function App() {
    return (
        <main>
            <MessageBox/>
            <hr/>
            <MarkdownEditor/>
        </main>
    )
}

export default App

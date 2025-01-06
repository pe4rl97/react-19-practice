import { lazy, Suspense, useState } from "react";

const MarkdownPreview = lazy(() => delayForDemo(import('./MarkdownPreview.tsx')));

const MarkdownEditor = () => {
    const [showPreview, setShowPreview] = useState(false);
    const [markdown, setMarkdown] = useState('Hello, **world**!');

    return (
        <>
            <textarea value={markdown} onChange={e => setMarkdown(e.target.value)}/>
            <br/>
            <label>
                <input type="checkbox" checked={showPreview} onChange={e => setShowPreview(e.target.checked)}/>
                Show Preview
            </label>
            <hr/>
            {showPreview && (
                <Suspense fallback={<p>Loading...</p>}>
                    <h2>Preview</h2>
                    <MarkdownPreview markdown={markdown}/>
                </Suspense>
            )}
        </>
    )
}

function delayForDemo(promise) {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    }).then(() => promise);
}

export default MarkdownEditor
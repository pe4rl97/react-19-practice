import { useState } from "react";
import { MessageContainer } from "./MessageContainer";

function fetchMessage() {
    return new Promise((resolve, reject) => {
        fetch('https://api.chucknorris.io/jokes/random')
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
      });
}

export default function MessageBox() {
    const [messagePromise, setMessagePromise] = useState<Promise<unknown> | null>(null);
    const [show, setShow] = useState(false);
    function download() {
        setMessagePromise(fetchMessage());
        setShow(true);
    }

    if (show) {
      return <MessageContainer messagePromise={messagePromise} />;
    } else {
      return <button onClick={download}>Download message</button>;
    }
}

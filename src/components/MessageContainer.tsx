import { use, Suspense } from "react";

interface Props {
    messagePromise: Promise<unknown> | null
}

function Message({ messagePromise }: Props) {
    const messageContent = use(messagePromise);
    return <p>Here is the message: {messageContent.value}</p>;
}

const MessageContainer = ({ messagePromise }: Props) =>  {
    return (
        <Suspense fallback={<p>⌛Downloading message...</p>}>
            <Message messagePromise={messagePromise} />
        </Suspense>
    );
}

export default MessageContainer
import ChatInput from "./ChatInput";
import Messages from "./Messages";

interface ChatWrapperProps {
  fileId: string
  isSubscribed: boolean
}

const Page = (props: ChatWrapperProps) => {
    return  <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2'>
      <div className='flex-1 flex justify-center items-center flex-col mb-28'>
        <Messages />
      </div>

      <ChatInput />
    </div>
}

export default Page;
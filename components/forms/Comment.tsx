"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { CommentValidation, } from '@/lib/validations/thread';
import { addCommentToThread, createThread } from '@/lib/actions/thread.action';
import { Input } from '../ui/input';
import Image from 'next/image';

interface Props {
    threadId: string,
    currentUserImg: string,
    currentUserId: string,
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
          thread: '',
        }
    })
    
    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
       await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);
    
       form.reset();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='comment-form'>

                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                        <FormItem className='flex items-center w-full gap-3'>
                            <FormLabel>
                                <Image 
                                    src={currentUserImg}
                                    alt='Profile image'
                                    height={48}
                                    width={48}
                                    className='rounded=full'
                                />
                            </FormLabel>
                            <FormControl className='border-none bg-transparent'>
                                <Input
                                    type='text'
                                    placeholder='Comment...'
                                    className='no-focus text-light-1 outline-none'
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type='submit' className='comment-form_btn'>
                    Reply
                </Button>
            </form>
        </Form>
    )
}

export default Comment
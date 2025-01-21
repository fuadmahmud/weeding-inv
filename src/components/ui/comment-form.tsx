import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './form';
import { Input } from './input';
import { Textarea } from './textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { Button } from './button';
import { Tables, TablesInsert } from '@/lib/types';
import { useEffect } from 'react';
import supabase from '@/lib/supabase';

const formSchema = z.object({
  name: z.string().min(5, { message: 'Mohon isi nama terlebih dahulu' }),
  comment: z.string({ required_error: 'Mohon isi ucapan terlebih dahulu' }),
  rsvp: z.string({ required_error: 'Mohon untuk konfirmasi kehadiran' }),
});

interface CommentFormProps {
  guest: Tables<'invite'> | null;
  fetchComments: () => void;
}

const CommentForm = (props: CommentFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.guest?.name || '',
    },
  });

  const submitComment = async (values: TablesInsert<'comment'>) => {
    const { error } = await supabase.from('comment').insert(values);

    if (!error) {
      props.fetchComments();
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    submitComment({
      ...values,
      rsvp: values.rsvp === 'yes',
      valid: !!props.guest?.name,
    });
  }

  useEffect(() => {
    if (props.guest) {
      form.reset();
    }
  }, [props.guest]);

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-3 mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Nama"
                    className="bg-eggshell"
                    disabled={!!props.guest?.name}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Berikan Ucapan"
                    maxLength={360}
                    className="bg-eggshell"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rsvp"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue="yes">
                  <FormControl>
                    <SelectTrigger className="bg-eggshell">
                      <SelectValue placeholder="Konfirmasi kehadiran" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="yes">Hadir</SelectItem>
                      <SelectItem value="no">Tidak Hadir</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-3" type="submit">
          Kirim
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;

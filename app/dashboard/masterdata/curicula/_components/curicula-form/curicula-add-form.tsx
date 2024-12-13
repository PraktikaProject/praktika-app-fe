'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Edit } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CuriculaFormSchema = z.object({
  name: z.string().min(1, { message: 'name is required' })
});

type CuriculaFormSchemaType = z.infer<typeof CuriculaFormSchema>;

const CuriculaCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const form = useForm<CuriculaFormSchemaType>({
    resolver: zodResolver(CuriculaFormSchema),
    defaultValues: {}
  });

  const onSubmit = async (values: CuriculaFormSchemaType) => {
    toast.success('Curicula created successfully');
    modalClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Create Curicula</CardTitle>
          <CardDescription>Create new Curicula</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter Curicula name"
                    {...field}
                    className=" px-4 py-2 shadow-inner drop-shadow-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={modalClose}>
            Cancel
          </Button>
          <Button type="submit">
            {' '}
            <Edit className="mr-2 h-4 w-4" />
            Create
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default CuriculaCreateForm;

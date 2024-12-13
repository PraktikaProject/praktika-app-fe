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
import axios from 'axios';

const CuriculaFormSchema = z.object({
  year: z.number().min(4, { message: 'year is required' })
});

type CuriculaFormSchemaType = z.infer<typeof CuriculaFormSchema>;

const CuriculaCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const form = useForm<CuriculaFormSchemaType>({
    resolver: zodResolver(CuriculaFormSchema),
    defaultValues: {}
  });
  const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URL;
  const onSubmit = async (values: CuriculaFormSchemaType) => {
    await axios.post(`${BASE_URI}/bases/curricula`, values);
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
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Curicula name"
                    {...field}
                    onChange={(e) => {
                      form.setValue('year', parseInt(e.target.value, 10));
                    }}
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

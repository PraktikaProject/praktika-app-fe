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
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

const CuriculaFormSchema = z.object({
  year: z.number().min(4, { message: 'year is required' })
});

type CuriculaFormSchemaType = z.infer<typeof CuriculaFormSchema>;

interface CuriculaUpdateFormProps {
  modalClose: () => void;
  data: any;
}

const CuriculaUpdateForm: React.FC<CuriculaUpdateFormProps> = ({
  modalClose,
  data
}) => {
  //   const { toast } = useToast();
  const form = useForm<CuriculaFormSchemaType>({
    resolver: zodResolver(CuriculaFormSchema),
    defaultValues: {
      year: data.year
    }
  });

  const onSubmit = async (values: CuriculaFormSchemaType) => {
    toast.success('Curicula updated successfully');
    modalClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Update Curicula</CardTitle>
          <CardDescription>Update entire Curicula data</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="year"
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
            Update
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default CuriculaUpdateForm;

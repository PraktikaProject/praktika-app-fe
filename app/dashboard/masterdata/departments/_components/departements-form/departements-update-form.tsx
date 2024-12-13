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

const DepartementsFormSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),
  code: z.string().min(1, { message: 'code is required' })
});

type DepartementsFormSchemaType = z.infer<typeof DepartementsFormSchema>;

interface DepartementsUpdateFormProps {
  modalClose: () => void;
  data: any;
}

const DepartementsUpdateForm: React.FC<DepartementsUpdateFormProps> = ({
  modalClose,
  data
}) => {
  //   const { toast } = useToast();
  const form = useForm<DepartementsFormSchemaType>({
    resolver: zodResolver(DepartementsFormSchema),
    defaultValues: {
      code: data.code,
      name: data.name
    }
  });

  const onSubmit = async (values: DepartementsFormSchemaType) => {
    toast.success('Departements updated successfully');
    modalClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Update Departements</CardTitle>
          <CardDescription>Update entire Departements data</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter Departements code"
                    {...field}
                    className=" px-4 py-2 shadow-inner drop-shadow-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardContent>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter Departements name"
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

export default DepartementsUpdateForm;

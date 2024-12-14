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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import axios from 'axios';
import { DepartementsData } from '@/types/base';

const MajorsFormSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),
  departmentId: z.number().min(1, { message: 'department id is required' })
});

type MajorsFormSchemaType = z.infer<typeof MajorsFormSchema>;

interface MajorsUpdateFormProps {
  modalClose: () => void;
  data: any;
}

const MajorsUpdateForm: React.FC<MajorsUpdateFormProps> = ({
  modalClose,
  data
}) => {
  const form = useForm<MajorsFormSchemaType>({
    resolver: zodResolver(MajorsFormSchema),
    defaultValues: {
      name: data.name,
      departmentId: data.departmentId
    }
  });

  const [selectedDepartementId, setSelectedDepartementId] = useState<
    number | null
  >(data.departmentId || null);
  const [loading, setLoading] = useState(false);
  const [departments, setSDepartements] = useState<DepartementsData[]>([]);
  const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URL;

  const onSubmit = async (values: MajorsFormSchemaType) => {
    try {
      await axios.patch(`${BASE_URI}/bases/majors/${data.id}`, values);
      toast.success('Majors updated successfully');
      modalClose();
    } catch (e) {
      console.log(e);
      toast.error('Failed to update Majors');
    }
  };

  useEffect(() => {
    const fetchDepartements = async () => {
      try {
        setLoading(true);
        const departements = await axios.get(`${BASE_URI}/bases/departements`);
        const departementsData: DepartementsData[] = departements.data.data;
        setSDepartements(departementsData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch departements:', error);
        setLoading(false);
      }
    };
    fetchDepartements();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Update Majors</CardTitle>
          <CardDescription>Update the Major details</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter Majors name"
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
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={selectedDepartementId?.toString() || ''}
                    onValueChange={(value) => {
                      const intValue = parseInt(value, 10);
                      setSelectedDepartementId(intValue);
                      field.onChange(intValue);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Department</SelectLabel>
                        {departments.map((department) => (
                          <SelectItem
                            key={department.id}
                            value={department.id.toString()}
                          >
                            {department.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
            <Edit className="mr-2 h-4 w-4" />
            Update
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default MajorsUpdateForm;

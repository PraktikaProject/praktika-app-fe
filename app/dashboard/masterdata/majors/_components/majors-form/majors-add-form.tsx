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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Edit } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { DepartementsData } from '@/types/base';
import { useState } from 'react';

const MajorsFormSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),
  departmentId: z.number().min(1, { message: 'department id is required' })
});

type MajorsFormSchemaType = z.infer<typeof MajorsFormSchema>;
type MajorsCreateFormProps = {
  modalClose: () => void;
  departements: DepartementsData[];
};

const MajorsCreateForm = ({
  modalClose,
  departements
}: MajorsCreateFormProps) => {
  const form = useForm<MajorsFormSchemaType>({
    resolver: zodResolver(MajorsFormSchema),
    defaultValues: {}
  });

  const [selectedDepartementId, setSelectedDepartementId] = useState<
    number | null
  >(null);
  const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URL;
  const onSubmit = async (values: MajorsFormSchemaType) => {
    await axios.post(`${BASE_URI}/bases/majors`, values);
    toast.success('Majors created successfully');
    modalClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Create Majors</CardTitle>
          <CardDescription>Create new Majors</CardDescription>
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
                      <SelectValue placeholder="Select Zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Zone</SelectLabel>
                        {departements.map((departement) => (
                          <SelectItem
                            key={departement.id}
                            value={departement.id.toString()}
                          >
                            {departement.name}
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
            {' '}
            <Edit className="mr-2 h-4 w-4" />
            Create
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default MajorsCreateForm;

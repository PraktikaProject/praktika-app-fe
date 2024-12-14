'use client';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { DepartementsData, MajorsData } from '@/types/base';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import axios from 'axios';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(8, {
    message: 'Name must be at least 8 characters.'
  }),
  nim: z.string().min(5, { message: 'NIM must be at least 5 characters.' }),
  departmentId: z.number().min(1, { message: 'Please select a department.' }),
  majorId: z.number().min(1, { message: 'Please select a major.' }),
  semester: z.number().min(1, { message: 'Please select a semester.' })
});

type StudentsFormProps = {
  data: number;
};

export default function StudentsForm({ data }: StudentsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      nim: '',
      departmentId: 0,
      majorId: 0,
      semester: 1
    }
  });

  const [departments, setDepartments] = React.useState<DepartementsData[]>([]);
  const [majors, setMajors] = React.useState<MajorsData[]>([]);
  const [loadingMajors, setLoadingMajors] = React.useState(false);
  const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URL;

  React.useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${BASE_URI}/bases/departements`);
        setDepartments(response.data.data);
      } catch (error) {
        toast.error('Failed to load departments.');
      }
    };
    fetchDepartments();
  }, []);

  const handleDepartmentChange = async (departmentId: string) => {
    const id = parseInt(departmentId, 10);
    if (id > 0) {
      setLoadingMajors(true);
      try {
        const response = await axios.get(
          `${BASE_URI}/bases/majors/department/${id}`
        );
        setMajors(response.data.data);
      } catch (error) {
        toast.error('Failed to load majors.');
      }
      setLoadingMajors(false);
    } else {
      setMajors([]);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`${BASE_URI}/users/students`, {
        name: values.name,
        nim: values.nim,
        majorId: values.majorId,
        semester: values.semester
      });
      toast.success('Student updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update student.');
    }
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Student Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nim"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIM</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your NIM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="departmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value));
                        handleDepartmentChange(value);
                      }}
                      value={String(field.value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((department) => (
                          <SelectItem
                            key={department.id}
                            value={String(department.id)}
                          >
                            {department.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="majorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Major</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={String(field.value)}
                      disabled={loadingMajors}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a major" />
                      </SelectTrigger>
                      <SelectContent>
                        {majors.map((major) => (
                          <SelectItem key={major.id} value={String(major.id)}>
                            {major.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>semester</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={14}
                        placeholder="Enter your semester"
                        {...field}
                        onChange={(e) => {
                          form.setValue(
                            'semester',
                            parseInt(e.target.value, 10)
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
